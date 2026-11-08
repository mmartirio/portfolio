import { useEffect, useState } from 'react';
import { projects as configured } from '../data/projects.js';
import { mergeProject } from '../../server/projectMetadata.js';

// Renderiza na hora com os dados locais e troca pelos dados lidos ao vivo
// dos sites publicados assim que /api/projects responder.
const initialProjects = configured.map((p) => mergeProject(p, null));

export function useProjects() {
  const [state, setState] = useState({ projects: initialProjects, live: false });

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/projects', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data) => {
        if (Array.isArray(data?.projects) && data.projects.length > 0) {
          setState({ projects: data.projects, live: true });
        }
      })
      .catch(() => {
        // Mantém os dados locais.
      });
    return () => controller.abort();
  }, []);

  return state;
}
