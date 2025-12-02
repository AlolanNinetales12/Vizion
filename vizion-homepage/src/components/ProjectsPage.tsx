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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Projects (from backend)</h2>

      <div className="mb-6 grid md:grid-cols-3 gap-4">
        <form className="col-span-1 bg-white p-4 rounded shadow" onSubmit={createProject}>
          <label className="block text-sm">Name</label>
          <input className="border p-2 w-full mb-2" value={name} onChange={(e) => setName(e.target.value)} />
          <label className="block text-sm">Description</label>
          <textarea className="border p-2 w-full mb-2" value={description} onChange={(e) => setDescription(e.target.value)} />
          <label className="block text-sm">Data file (CSV)</label>
          <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
          <div className="mt-3">
            <button className="bg-blue-600 text-white px-3 py-1 rounded" type="submit">Create</button>
          </div>
        </form>

        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Your projects</h3>
          {projects.length === 0 && <p className="text-sm text-gray-600">No projects or not logged in.</p>}
          <ul className="space-y-2 mt-2">
            {projects.map((p) => (
              <li key={p.id} className="p-2 border rounded">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-gray-600">{p.description}</div>
                    {p.data_file && <a className="text-blue-600" href={`${API_BASE}${p.data_file}`}>Download file</a>}
                  </div>
                  <div className="text-sm text-gray-500">{p.owner}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
