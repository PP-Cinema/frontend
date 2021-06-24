export const API_BASE_URL = "https://localhost:5001/api";
const BASE_URL = "https://localhost:5001";

const CONTROLLERS =
{
    employees: "employees",
    articles: "articles",
    movies: "movies",
    performances: "performances",
    halls: "halls"
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
    moviesAll: URL(CONTROLLERS.movies,'all'),
    performances: URL(CONTROLLERS.performances,''),
    halls: URL(CONTROLLERS.halls,'all')
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
    MOVIE_VIEW:"/movies/view",
    ARTICLES: "/articles",
    ARTICLE_VIEW: "/articles/view",
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
    { key: "Employee", name: "Manage Employees", defaultPath: PATH(PATHS.EMPLOYEES,'manage')},
    { key: "Articles", name: "Manage Articles", defaultPath: PATH(PATHS.ARTICLES,'manage')},
    { key: "Movies", name: "Manage Movies", defaultPath: PATH(PATHS.MOVIES,'manage')},
    { key: "Performances", name: "Manage Performances", defaultPath: PATH(PATHS.PERFORMANCES,'manage')},
];

export const EMPLOYEE_MODES =
[
    {key: "add-employee", value: "Add Employee", path: PATH(PATHS.EMPLOYEES,'add'), role: 'Admin', type: 'Employee'},
    {key: "view-employees", value: "View Employees", path: PATH(PATHS.EMPLOYEES,'manage'),role: 'Admin', type: 'Employee'},
    {key: "add-article", value: "New Article",path: PATH(PATHS.ARTICLES,'add'), role: 'Employee', type: 'Articles'},
    {key: "view-articles", value: "View Articles", path: PATH(PATHS.ARTICLES,'manage'), role: 'Employee', type:'Articles'},
    {key: "add-movie", value: "New Movie", path: PATH(PATHS.MOVIES,'add'), role: 'Employee', type: 'Movies'},
    {key: "view-movies", value: "View Movies", path: PATH(PATHS.MOVIES,'manage'), role: 'Employee', type: 'Movies'},
    {key: "view-performances", value: "View Performances", path: PATH(PATHS.PERFORMANCES,'manage'), role: 'Employee', type: 'Performances'}
];

export const HEADERS = 
[
    "Superkino", 
    "Superkino Employee Login Panel", 
    "Superkino Employee Panel"
];