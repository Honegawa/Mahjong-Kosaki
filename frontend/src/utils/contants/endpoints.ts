const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const ENDPOINTS = {
  PERSON: `${API_BASE_URL}/person`,
  CONTACT: `${API_BASE_URL}/contact`,
  BOOKING: `${API_BASE_URL}/booking`,
  ARTICLE: `${API_BASE_URL}/article`,
  TOURNAMENT: `${API_BASE_URL}/tournament`,
  PARTICIPANT: `${API_BASE_URL}/participant`,
  GAME: `${API_BASE_URL}/game`,
  ROUND: `${API_BASE_URL}/round`,
  PLAYER_ROUND: `${API_BASE_URL}/playerRound`,
};

export default ENDPOINTS;
