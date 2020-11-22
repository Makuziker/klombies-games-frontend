import React, { useCallback, useEffect, useState } from 'react';
import { Button, Typography, Grid, makeStyles } from '@material-ui/core';

import { ICard } from '../../store';
import { CardGroups } from './CardGroups';
import { PlayingCard } from '../PlayingCard';

export interface IPlayerControlsProps {
  hand: ICard[];
  validGroups: ICard[][];
  playerMayDiscard: boolean;
  playerMayDraw: boolean;
  isCurrentPlayersTurn: boolean;
  anotherPlayerGoneOut: boolean;
  onDiscard: (card: ICard) => void;
  onGoOut: (groups: ICard[][], discard: ICard) => void;
  onLayDownCards: (groups: ICard[][], discard: ICard) => void;
}

const useStyles = makeStyles(({ spacing }) => ({
  button: {
    padding: spacing(1)
  },
  handContainer: {
    boxShadow: '4px 4px 8px #ddd',
    border: '1px solid #ccc',
    minHeight: spacing(8)
  }
}));

export function PlayerControls({
  hand,
  validGroups,
  playerMayDraw,
  playerMayDiscard,
  isCurrentPlayersTurn,
  anotherPlayerGoneOut,
  onDiscard,
  onGoOut,
  onLayDownCards
}: IPlayerControlsProps) {
  const [isGoingOut, setIsGoingOut] = useState(false);
  const [selectedCards, setSelectedCards] = useState<ICard[]>([]);
  const [cardGroups, setCardGroups] = useState<ICard[][]>([]);

  const classes = useStyles();

  const toggleGoingOut = useCallback(() => {
    setCardGroups([]);
    setSelectedCards([]);
    setIsGoingOut(val => !val);
  }, [setCardGroups, setSelectedCards, setIsGoingOut]);

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
      if (anotherPlayerGoneOut) {
        onLayDownCards(cardGroups, lastUngroupedCard);
        setCardGroups([]);
        setSelectedCards([]);
      } else {
        onGoOut(cardGroups, lastUngroupedCard);
        setCardGroups([]);
        setSelectedCards([]);
        setIsGoingOut(false);
      }
    }
  }, [cardGroups, anotherPlayerGoneOut, getLastUngroupedCard, onGoOut, onLayDownCards]);

  const isCardSelected = useCallback((card: ICard) => {
    return !!selectedCards.find(c => c.id === card.id);
  }, [selectedCards]);

  const toggleCardSelect = (card: ICard) => {
    const idx = selectedCards.findIndex(c => c.id === card.id);
    if (idx === -1) {
      setSelectedCards(arr => [...arr, card]);
    } else {
      setSelectedCards(arr => arr.filter(c => c.id !== card.id));
    }
  }

  const onCardSelect = (card: ICard) => {
    if (isGoingOut || anotherPlayerGoneOut) {
      toggleCardSelect(card);
    } else {
      setSelectedCards([card]);
    }
  }

  const renderTutorialMessage = useCallback(() => {
    if (!isCurrentPlayersTurn) return 'Await your next turn...';
    if (anotherPlayerGoneOut) return 'Another player has gone out. Select the cards you can group and click \'Group\'. If you cannot groups every card in your hand (besides your one discard), select one card to discard; leftover cards in your hand will be added to your score.';
    if (isGoingOut) return 'Select the cards you want to group and click \'Group\'. Finish going out by grouping every card in your hand (besides your discard). The last remaining card will automatically discard.';
    if (playerMayDraw) return 'Draw a card from the Deck or from the Discard Pile.';
    if (playerMayDiscard) return 'Select a card in your hand, then click \'Discard\' to end your turn. Or click \'Go Out\' if you can group all your cards.';
    return 'Edge case in the tutorial';
  }, [isCurrentPlayersTurn, anotherPlayerGoneOut, isGoingOut, playerMayDraw, playerMayDiscard]);

  const renderGoOutButtonLabel = useCallback(
    () => isGoingOut ? 'Cancel Go Out' : 'Go Out',
    [isGoingOut]
  );

  const handleDiscard = useCallback(
    () => {
      if (anotherPlayerGoneOut) {
        onLayDownCards(cardGroups, selectedCards[0]);
        setSelectedCards([]);
        setCardGroups([]);
      } else {
        onDiscard(selectedCards[0]);
        setSelectedCards([]);
        setCardGroups([]);
      }
    },
    [anotherPlayerGoneOut, cardGroups, selectedCards, onLayDownCards, onDiscard, setSelectedCards, setCardGroups]
  );

  return (
    <>
      <Typography variant="subtitle2" align="center">{renderTutorialMessage()}</Typography>
      <CardGroups stagedGroups={cardGroups} validGroups={validGroups} />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item className={classes.button}>
          <Button
            disabled={!isCurrentPlayersTurn || anotherPlayerGoneOut || !playerMayDiscard}
            onClick={toggleGoingOut}
            variant="contained"
            color={isGoingOut ? "secondary" : "primary"}
          >
            {renderGoOutButtonLabel()}
          </Button>
        </Grid>
        <Grid item className={classes.button}>
          <Button
            disabled={selectedCards.length < 3}
            onClick={() => addGroup()}
            variant="contained"
            color="primary"
          >
            Group
          </Button>
        </Grid>
        <Grid item className={classes.button}>
          <Button
            disabled={cardGroups.length < 1}
            onClick={() => setCardGroups([])}
            variant="contained"
            color="secondary"
          >
            Ungroup
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="center" className={classes.handContainer}>
        <Typography align="center" variant="subtitle1">Your Hand</Typography>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {hand.map((card) => (
            <PlayingCard
              key={card.id}
              card={card}
              isDisabled={!playerMayDiscard || isCardGrouped(card)}
              isSelected={isCardSelected(card)}
              onCardSelect={onCardSelect}
            />
          ))}
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center" className={classes.button}>
        <Button
          disabled={!isCurrentPlayersTurn || !playerMayDiscard || isGoingOut || selectedCards.length !== 1}
          onClick={() => handleDiscard()}
          variant="contained"
          color="secondary"
        >
          Discard
        </Button>
      </Grid>
    </>
  );
}