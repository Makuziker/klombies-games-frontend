import React, { useCallback, useEffect, useState } from 'react';
import { List, ListItem, Button, Typography } from '@material-ui/core';

import { ICard } from '../../store';

export interface IPlayerHandProps {
  hand: ICard[];
  playerMayDiscard: boolean;
  playerMayDraw: boolean;
  isCurrentPlayersTurn: boolean;
  anotherPlayerGoneOut: boolean;
  onDiscard: (card: ICard) => void;
  onGoOut: (groups: ICard[][], discard: ICard) => void;
}

export function PlayerHand({
  hand,
  playerMayDraw,
  playerMayDiscard,
  isCurrentPlayersTurn,
  anotherPlayerGoneOut,
  onDiscard,
  onGoOut
}: IPlayerHandProps) {
  const [isGoingOut, setIsGoingOut] = useState(false);
  const [selectedCards, setSelectedCards] = useState<ICard[]>([]);
  const [cardGroups, setCardGroups] = useState<ICard[][]>([]);

  const toggleGoingOut = useCallback(() => {
    setIsGoingOut(val => !val);
  }, []);

  const isCardGrouped = useCallback((card: ICard) => {
    if (!cardGroups.length) return false;
    for (let group of cardGroups) {
      if (group.find(c => c.id === card.id)) return true;
    }
    return false;
  }, [cardGroups]);

  const getLastUngroupedCard = useCallback(() => {
    let ungroupedCard: ICard | null = null;
    for (let card of hand) {
      if (!isCardGrouped(card)) {
        if (ungroupedCard) return null;
        ungroupedCard = { ...card };
      }
    }
    return ungroupedCard;
  }, [hand, isCardGrouped]);

  const addGroup = useCallback(() => {
    setCardGroups(arr => [...arr, selectedCards]);
    setSelectedCards([]);
  }, [setCardGroups, selectedCards, setSelectedCards]);

  useEffect(() => {
    const lastUngroupedCard = getLastUngroupedCard();
    if (lastUngroupedCard) {
      onGoOut(cardGroups, lastUngroupedCard);
    }
  }, [cardGroups, getLastUngroupedCard, onGoOut]);

  const toggleCardSelect = (card: ICard) => {
    const idx = selectedCards.findIndex(c => c.id === card.id);
    if (idx === -1) {
      setSelectedCards(arr => [...arr, card]);
    } else {
      setSelectedCards(arr => arr.filter(c => c.id !== card.id));
    }
  }

  const onCardClick = (card: ICard) => {
    if (isGoingOut || anotherPlayerGoneOut) {
      toggleCardSelect(card);
    } else {
      onDiscard(card);
    }
  }

  const renderTutorialMessage = useCallback(() => {
    if (!isCurrentPlayersTurn) return 'Await your next turn...';
    if (anotherPlayerGoneOut) return 'Another player has gone out. Select the cards you can group and click \'Group\'. Leftover cards will be added to your score.';
    if (isGoingOut) return 'Select the cards you want to group and click \'Group\'. Finish going out by grouping all but but one card in your hand. The last remaining card will automatically discard.';
    if (playerMayDraw) return 'Draw a card from the deck or from the discard pile.';
    if (playerMayDiscard) return 'Select a card in your hand to discard and end your turn. Or click \'Start Going Out\' if you can group your cards.';
    return 'Edge case in the tutorial';
  }, [isCurrentPlayersTurn, anotherPlayerGoneOut, isGoingOut, playerMayDraw, playerMayDiscard]);

  const renderGoOutButtonLabel = useCallback(
    () => isGoingOut ? 'Cancel Going Out' : 'Start Going Out',
    [isGoingOut]
  );

  const renderCardFace = (card: ICard) => {
    return card.value === 'JOKER' ? card.value : `${card.value} of ${card.suit}`;
  }

  // todo remove
  useEffect(() => {
    console.log('selected cards', selectedCards);
    console.log('card groups', cardGroups);
  }, [selectedCards, cardGroups]);

  return (
    <>
      <Typography>{renderTutorialMessage()}</Typography>
      <Button
        disabled={!isCurrentPlayersTurn || anotherPlayerGoneOut || !playerMayDiscard}
        onClick={toggleGoingOut}
        variant="contained"
        color="primary">
        {renderGoOutButtonLabel()}
      </Button>
      <Button
        disabled={selectedCards.length < 3}
        onClick={() => addGroup()}
        variant="contained"
        color="primary">
        Group Selected Cards
      </Button>
      <Button
        disabled={cardGroups.length < 1}
        onClick={() => setCardGroups([])}
        variant="contained"
        color="secondary">
        Ungroup all Cards
      </Button>
      <List>
        {hand.map((card) => (
          <ListItem key={card.id}>
            <Button
              disabled={!playerMayDiscard || isCardGrouped(card)}
              onClick={() => onCardClick(card)}>
              {renderCardFace(card)}
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
}