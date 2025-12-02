import React, { useEffect, useState } from "react";

type Project = {
  id: number;
  name: string;
  description: string;
  data_file: string | null;
  owner: string;
};

const API_BASE = "http://127.0.0.1:8000";

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/projects-api/`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        // not authenticated or error
        setProjects([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);
    if (file) fd.append("data_file", file);

    const res = await fetch(`${API_BASE}/api/projects-api/`, {
      method: "POST",
      body: fd,
      credentials: "include",
    });
    if (res.ok) {
      setName("");
      setDescription("");
      setFile(null);
      fetchProjects();
    } else {
      alert("Could not create project. Are you logged in?");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-blue-300 mb-2">Your Projects</h2>
        <p className="text-blue-400">Manage and analyze your data projects</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Create Project Form */}
        <form className="col-span-1 bg-gradient-to-br from-blue-900 via-blue-950 to-blue-950 border border-blue-800 rounded-xl p-6 shadow-lg shadow-blue-500/10" onSubmit={createProject}>
          <h3 className="text-lg font-bold text-blue-300 mb-4">New Project</h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="proj-name" className="block text-sm font-medium text-blue-300 mb-1.5">
                Project Name
              </label>
              <input
                id="proj-name"
                title="project name"
                placeholder="My Analytics Project"
                className="w-full px-3 py-2 bg-blue-900/30 border border-blue-700/50 rounded-lg text-blue-100 placeholder-blue-500/50 focus:outline-none focus:border-blue-500 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="proj-desc" className="block text-sm font-medium text-blue-300 mb-1.5">
                Description
              </label>
              <textarea
                id="proj-desc"
                title="project description"
                placeholder="Describe your project..."
                className="w-full px-3 py-2 bg-blue-900/30 border border-blue-700/50 rounded-lg text-blue-100 placeholder-blue-500/50 focus:outline-none focus:border-blue-500 transition resize-none"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="proj-file" className="block text-sm font-medium text-blue-300 mb-1.5">
                Upload CSV (optional)
              </label>
              <input
                id="proj-file"
                title="csv file"
                type="file"
                accept=".csv"
                className="w-full text-sm text-blue-400 file:bg-blue-600 file:text-white file:border-0 file:rounded file:px-2 file:py-1 file:cursor-pointer hover:file:bg-blue-500 transition"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              />
            </div>

            <button
              className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition"
              type="submit"
            >
              Create Project
            </button>
          </div>
        </form>

        {/* Projects List */}
        <div className="md:col-span-2 bg-gradient-to-br from-blue-900 via-blue-950 to-blue-950 border border-blue-800 rounded-xl p-6 shadow-lg shadow-blue-500/10">
          <h3 className="text-lg font-bold text-blue-300 mb-4">Projects</h3>

          {projects.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-blue-400">No projects yet. Create one to get started!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {projects.map((p) => (
                <li
                  key={p.id}
                  className="bg-blue-800/20 hover:bg-blue-800/30 border border-blue-700/30 rounded-lg p-4 transition"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-lg font-semibold text-blue-300">{p.name}</div>
                      <p className="text-sm text-blue-400 mt-1 line-clamp-2">{p.description || "No description"}</p>
                      {p.data_file && (
                        <a
                          href={`${API_BASE}${p.data_file}`}
                          className="inline-block text-xs text-blue-300 hover:text-blue-200 mt-2 px-2 py-1 bg-blue-600/20 rounded transition"
                        >
                          📁 Download file
                        </a>
                      )}
                    </div>
                    <div className="text-xs text-blue-500 whitespace-nowrap">{p.owner}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
