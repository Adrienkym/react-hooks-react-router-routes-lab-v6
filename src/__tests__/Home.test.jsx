import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routes } from "../routes";
import { vi } from 'vitest'; 

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url === 'http://localhost:3000/movies') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: 1, title: "Doctor Strange", time: "2h 6m", genres: ["Action", "Fantasy"], directorId: 1, actorIds: [1, 2] },
          { id: 2, title: "Spider-Man: No Way Home", time: "2h 28m", genres: ["Action", "Sci-Fi"], directorId: 2, actorIds: [3, 4] },
          { id: 3, title: "Inception", time: "2h 28m", genres: ["Sci-Fi", "Thriller"], directorId: 3, actorIds: [5] },
        ]),
      });
    }
    
    return Promise.reject(new Error(`Unhandled request for ${url}`));
  });
});


afterEach(() => {
  vi.restoreAllMocks();
});


test("renders 'Home Page' inside of an <h1 />", async () => {

  const router = createMemoryRouter(routes, {

    initialEntries: ["/"], 

    initialIndex: 0

  });

  render(<RouterProvider router={router} />);


  

  const h1 = await screen.findByRole('heading', { name: /Home Page/i });

  expect(h1).toBeInTheDocument();

  expect(h1.tagName).toBe("H1");

});

test("Displays a list of movie titles", async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 0
  });
  render(<RouterProvider router={router} />);

  
  const titleList = await screen.findAllByRole('heading', { level: 3 }); 
  expect(titleList.length).toBeGreaterThanOrEqual(3); 
  expect(titleList[0].tagName).toBe("H3"); 
  expect(titleList[0].textContent).toBe("Doctor Strange");
});

test("Displays links for each associated movie", async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 0
  });
  render(<RouterProvider router={router} />);

  const linkList = await screen.findAllByRole('link', { name: /Doctor Strange|Spider-Man: No Way Home|Inception/i });
  expect(linkList.length).toBeGreaterThanOrEqual(3);
  expect(linkList[0]).toHaveAttribute("href", "/movie/1"); 
});

test("renders the <NavBar /> component", async () => { 
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"], 
    initialIndex: 0
  });
  render(
      <RouterProvider router={router}/>
  );
  expect(await screen.findByRole('navigation')).toBeInTheDocument();
  expect(document.querySelector(".navbar")).toBeInTheDocument(); 
});