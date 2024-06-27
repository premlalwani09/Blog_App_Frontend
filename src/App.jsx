import { useEffect, useState } from "react";
import Blog from "./Blog.jsx";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [searchAuthor, setSearchAuthor] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = (author = "") => {
    let url = `http://localhost:4000/getBlogs`;
    if (author) {
      url += `?author=${encodeURIComponent(author)}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setBlogs(result);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchAuthor(event.target.value);
  };

  const handleSearch = () => {
    fetchBlogs(searchAuthor);
  };

  return (
    <>
      <main className="flex flex-wrap">
        <input
          type="text"
          placeholder="Search by Author"
          value={searchAuthor}
          onChange={handleSearchChange}
          className="p-2 m-2 rounded border"
        />
        <button onClick={handleSearch} className="p-2 m-2 rounded bg-blue-500 text-white">Search</button>
        {blogs.length > 0
          ? blogs.map((blog, index) => {
              return <Blog key={index} blog={blog} />;
            })
          : "No blogs found."}
      </main>
    </>
  );
}

export default App;
