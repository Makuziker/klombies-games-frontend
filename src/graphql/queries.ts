/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGameState = /* GraphQL */ `
  query GetGameState($roomCode: String!) {
    getGameState(roomCode: $roomCode) {
      roomCode
      isGameInSession
      currentRound
      dealerIdx
      turnIdx
      topCardInDiscard {
        id
        rank
        suit
      }
      playerRoster {
        id
        numGoneOut
        readyToStart
      }
      playerIdWhoWentOut
      winnerId
    }
  }
`;
export const getMessages = /* GraphQL */ `
  query GetMessages($playerId: ID!) {
    getMessages(playerId: $playerId) {
      owner
      text
    }
  }
`;
