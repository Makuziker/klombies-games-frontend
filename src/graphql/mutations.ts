/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const postMessage = /* GraphQL */ `
  mutation PostMessage($playerId: ID!, $text: String) {
    postMessage(playerId: $playerId, text: $text) {
      owner
      text
    }
  }
`;
export const readyToStart = /* GraphQL */ `
  mutation ReadyToStart($playerId: ID!) {
    readyToStart(playerId: $playerId)
  }
`;
export const drawFromDeck = /* GraphQL */ `
  mutation DrawFromDeck($playerId: ID!) {
    drawFromDeck(playerId: $playerId) {
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
export const drawFromDiscard = /* GraphQL */ `
  mutation DrawFromDiscard($playerId: ID!) {
    drawFromDiscard(playerId: $playerId) {
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
export const discardFromHand = /* GraphQL */ `
  mutation DiscardFromHand($playerId: ID!, $cardId: ID!) {
    discardFromHand(playerId: $playerId, cardId: $cardId) {
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
export const goOut = /* GraphQL */ `
  mutation GoOut($playerId: ID!, $groups: [ID], $discardId: ID) {
    goOut(playerId: $playerId, groups: $groups, discardId: $discardId) {
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
export const layDownCards = /* GraphQL */ `
  mutation LayDownCards($playerId: ID!, $groups: [ID], $discardId: ID!) {
    layDownCards(playerId: $playerId, groups: $groups, discardId: $discardId) {
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
