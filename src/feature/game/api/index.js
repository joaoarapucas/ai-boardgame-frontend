import { apiClient } from '@core/helpers/fetch';

export function listPlayers() {
  return apiClient('/players', {
    method: 'GET',
  });
}

export function registerPlayer(dto) {
  return apiClient('/players', {
    method: 'POST',
    body: dto,
  });
}

export function updatePlayerMoveEndpoint(playerId, dto) {
  return apiClient(`/players/${playerId}`, {
    method: 'PUT',
    body: dto,
  });
}

export function listGames(dto, status, page, pageSize) {
  return apiClient('/games', {
    method: 'GET',
    query: { dto, status: status, page: page, page_size: pageSize }
  });
}

export function getGame(gameId) {
  return apiClient(`/games/${gameId}`, {
    method: 'GET',
  });
}

export function createGame(dto) {
  return apiClient('/games', {
    method: 'POST',
    body: dto,
  });
}

export function startGame(gameId, dto) {
  return apiClient(`/games/${gameId}/start`, {
    method: 'POST',
    body: dto,
  });
}

export function joinGame(gameId, dto) {
  return apiClient(`/games/${gameId}/join`, {
    method: 'POST',
    body: dto,
  });
}

export function registerSpectator(gameId, dto) {
  return apiClient(`/games/${gameId}/spectators`, {
    method: 'POST',
    body: dto,
  });
}

export function getApiMockState() {
  return apiClient('/games/mock-state', {
    method: 'POST',
  });
}

export function sendApiMockAction(dto) {
  return apiClient('/games/mock-state', {
    method: 'POST',
    body: dto,
  });
}
