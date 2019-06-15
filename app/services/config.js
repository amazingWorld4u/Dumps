/**
 * Configuration file for base urls and other configurations.
 */
import axios from "axios";

const BASE_URL = "https://examdumps.azurewebsites.net/API/api";

// Set base url to all axios requests.
axios.defaults.baseURL = BASE_URL;
