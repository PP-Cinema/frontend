export const API_BASE_URL = "https://localhost:5001/api"

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

export const ENDPOINT =
{
    authenticate: URL(CONTROLLERS.employees,'authenticate'),
    refresh: URL(CONTROLLERS.employees,'refresh')
}

export const PATHS =
{
    HOMEPAGE: "/",
    LOGIN: "/login",
    EMPLOYEE_PANEL: "/panel"
};

export const REQUEST_STATUS =
{
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
}
export const HOME_KEYS = 
[
    {key:"performances", value:"Seanse"},
    {key:"news", value:"Newsy"},
    {key:"movies", value:"Filmy"},
    {key:"reservations", value:"Rezerwacje"}
];

export const ADMIN_MODES =
[
    {key: "add-employee", value: "Add Employee"}
];

export const EMPLOYEE_MODES =
[
    {key: "add-article", value: "New Article"},
    {key: "add-movie", value: "New Movie"},
    {key: "delete-movie", value: "Remove Movie"},
    {key: "add-performance", value: "New Performance"},
    {key: "delete-performance", value: "Remove Performance"}
]