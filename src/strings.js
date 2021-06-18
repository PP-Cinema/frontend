export const API_BASE_URL = "https://localhost:5001/api";

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

const PATH = (path,mode) =>
{
    return `${path}/${mode}`;
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
    {key:"performances", value:"Seanse"},
    {key:"articles", value:"Newsy"},
    {key:"movies", value:"Filmy"},
    {key:"reservations", value:"Rezerwacje"}
];

export const EMPLOYEE_MODES =
[
    {key: "add-employee", value: "Add Employee", path: PATH(PATHS.EMPLOYEES,'add'), role: 'Admin'},
    {key: "add-article", value: "New Article",path: PATH(PATHS.ARTICLES,'add'), role: 'Employee'},
    {key: "add-movie", value: "New Movie", path: PATH(PATHS.MOVIES,'add'), role: 'Employee'},
    {key: "delete-movie", value: "Remove Movie", path: PATH(PATHS.MOVIES,'delete'), role: 'Employee'},
    {key: "add-performance", value: "New Performance", path: PATH(PATHS.PERFORMANCES,'add'), role: 'Employee'},
    {key: "delete-performance", value: "Remove Performance", path: PATH(PATHS.PERFORMANCES,'delete'), role: 'Employee'}
];

export const HEADERS = 
[
    "Superkino", 
    "Superkino Employee Login Panel", 
    "Superkino Employee Panel"
];