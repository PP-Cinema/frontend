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