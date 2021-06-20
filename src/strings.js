export const API_BASE_URL = "https://localhost:5001/api";
const BASE_URL = "https://localhost:5001";

const CONTROLLERS =
{
    employees: "employees",
    articles: "articles",
    movies: "movies",
    performances: "performances"
}

const URL = (controller,endpoint) =>
{
   return `${API_BASE_URL}/${controller}${endpoint ? `/${endpoint}` : ''}`;
}

const UPLOAD_URL = (directory) =>
{
    return `${BASE_URL}/${directory}`;
}

const PATH = (path,mode) =>
{
    return `${path}${mode ? `/${mode}`:''}`;
}

export const ENDPOINT =
{
    authenticate: URL(CONTROLLERS.employees,'authenticate'),
    refresh: URL(CONTROLLERS.employees,'refresh'),
    articles: URL(CONTROLLERS.articles,''),
    employees: URL(CONTROLLERS.employees,''),
    movies: URL(CONTROLLERS.movies,''),
    performances: URL(CONTROLLERS.performances,'')

}

export const WWWROOT = 
{
    articles: UPLOAD_URL('articles'),
    posters: UPLOAD_URL('posters'),
    images: UPLOAD_URL('images')
}

export const PATHS =
{
    HOMEPAGE: "/",
    LOGIN: "/login",
    EMPLOYEES: "/employees",
    PERFORMANCES: "/performances",
    MOVIES: "/movies",
    ARTICLES: "/articles",
    RESERVATIONS: "/reservations",
};

export const REQUEST_STATUS =
{
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
}
export const HOME_KEYS = 
[
    {key:"performances", value:"Seanse",path: PATH(PATHS.PERFORMANCES,'')},
    {key:"articles", value:"Newsy", path: PATH(PATHS.ARTICLES,'')},
    {key:"movies", value:"Filmy", path: PATH(PATHS.MOVIES,'')},
    {key:"reservations", value:"Rezerwacje", path: PATH(PATHS.RESERVATIONS,'')}
];

export const PANEL_TYPES =
[
    { key: "Employee", name: "Manage Employees" },
    { key: "Articles", name: "Manage Articles"},
    { key: "Movies", name: "Manage Movies"},
    { key: "Performances", name: "Manage Performances"},
];

export const EMPLOYEE_MODES =
[
    {key: "add-employee", value: "Add Employee", path: PATH(PATHS.EMPLOYEES,'add'), role: 'Admin', type: 'Employee'},
    {key: "add-article", value: "New Article",path: PATH(PATHS.ARTICLES,'add'), role: 'Employee', type: 'Articles'},
    {key: "add-movie", value: "New Movie", path: PATH(PATHS.MOVIES,'add'), role: 'Employee', type: 'Movies'},
    {key: "delete-movie", value: "Remove Movie", path: PATH(PATHS.MOVIES,'delete'), role: 'Employee', type: 'Movies'},
    {key: "add-performance", value: "New Performance", path: PATH(PATHS.PERFORMANCES,'add'), role: 'Employee', type: 'Performances'},
    {key: "delete-performance", value: "Remove Performance", path: PATH(PATHS.PERFORMANCES,'delete'), role: 'Employee', type: 'Performances'}
];

export const HEADERS = 
[
    "Superkino", 
    "Superkino Employee Login Panel", 
    "Superkino Employee Panel"
];