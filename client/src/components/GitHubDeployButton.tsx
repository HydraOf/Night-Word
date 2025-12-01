import { useState } from 'react';
import { Github, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function GitHubDeployButton() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDeploy = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-github-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoName: 'night-word' }),
      });

      if (!response.ok) throw new Error('Failed to create repository');

      const { repoUrl } = await response.json();
      
      toast({
        title: 'Репозиторий создан!',
        description: `Открываю GitHub: ${repoUrl}`,
      });

      window.open(repoUrl, '_blank');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось создать репо',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDeploy}
      disabled={loading}
      className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      data-testid="button-github-deploy"
    >
      {loading ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          Создание...
        </>
      ) : (
        <>
          <Github className="w-4 h-4" />
          Создать на GitHub
        </>
      )}
    </Button>
  );
}
