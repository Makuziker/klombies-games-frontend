/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const subGameState = /* GraphQL */ `
  subscription SubGameState($playerId: ID!) {
    subGameState(playerId: $playerId) {
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
export const subMessages = /* GraphQL */ `
  subscription SubMessages($playerId: ID!) {
    subMessages(playerId: $playerId) {
      owner
      text
    }
  }
`;
