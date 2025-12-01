import { Octokit } from '@octokit/rest'
import fs from 'fs'
import path from 'path'

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

export async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

interface FileEntry {
  path: string;
  content: string;
}

function getAllFiles(dir: string, baseDir: string = '', files: FileEntry[] = []): FileEntry[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  const skipDirs = ['node_modules', '.git', 'dist', '.cache', '.upm', '.local', '.vscode', '.idea'];
  const skipFiles = ['.DS_Store', 'package-lock.json'];

  for (const entry of entries) {
    if (skipDirs.includes(entry.name)) continue;
    if (skipFiles.includes(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    const relativePath = baseDir ? `${baseDir}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      getAllFiles(fullPath, relativePath, files);
    } else {
      const content = fs.readFileSync(fullPath, 'utf-8');
      files.push({ path: relativePath, content });
    }
  }

  return files;
}

export async function createGitHubRepo(repoName: string) {
  try {
    const octokit = await getUncachableGitHubClient();

    // Get current user
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`Uploading to repo: ${user.login}/${repoName}`);

    // Check if repo exists, if not create it
    let repo;
    try {
      const { data: existingRepo } = await octokit.repos.get({
        owner: user.login,
        repo: repoName,
      });
      repo = existingRepo;
      console.log(`✅ Using existing repository: ${repo.html_url}`);
    } catch (err) {
      const { data: newRepo } = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: 'Night Word - Interactive 3D Website with Cyberpunk Aesthetic',
        private: false,
        auto_init: false,
      });
      repo = newRepo;
      console.log(`✅ Repository created: ${repo.html_url}`);
    }

    // Get all project files
    const files = getAllFiles('/home/runner/workspace');
    console.log(`📦 Found ${files.length} files to upload`);

    // Create commits for all files
    for (const file of files) {
      try {
        await octokit.repos.createOrUpdateFileContents({
          owner: user.login,
          repo: repoName,
          path: file.path,
          message: `Add ${file.path}`,
          content: Buffer.from(file.content).toString('base64'),
        });
        console.log(`✓ Uploaded: ${file.path}`);
      } catch (err: any) {
        console.error(`✗ Failed to upload ${file.path}:`, err.message);
      }
    }

    console.log(`\n✨ Repository ready at: ${repo.html_url}`);
    console.log(`\n🚀 Next steps for Render.com:`);
    console.log(`1. Go to https://render.com`);
    console.log(`2. Create Web Service and connect to: ${repo.html_url}`);
    console.log(`3. Set Build Command: npm run build`);
    console.log(`4. Set Start Command: npm start`);
    console.log(`5. Add env var: NODE_ENV=production`);
    console.log(`6. Add env var: SESSION_SECRET=<random-key>`);

    return repo.html_url;
  } catch (error) {
    console.error('❌ Error creating repository:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const repoName = process.argv[2] || 'night-word';
  createGitHubRepo(repoName).catch(console.error);
}
