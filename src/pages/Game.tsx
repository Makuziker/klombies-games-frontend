import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, makeStyles, Typography, Button, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { useRoute } from '../hooks';
import { ICard, useAppSelectors, apiDrawFromDeck, apiDrawFromDiscard, apiDiscardFromHand, apiGoOut, apiLayDownCards, updateShowGameOverPage } from '../store';
import { PlayerQueue, CardDeck, PlayerControls } from '../components';
import { IApplicationState } from '../store/types';
import { socket } from '../constants';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    width: '100%',
    padding: '0'
  },
  messageContainer: {
    boxShadow: '4px 8px 16px #665367',
    border: '1px solid #eee',
    padding: spacing(2)
  },
  button: {
    padding: spacing(8)
  }
}));

export function GamePage() {
  const {
    selectHand,
    selectCurrentRound,
    selectDealerIdx,
    selectTurnIdx,
    selectTopCardInDiscard,
    selectUsersInRoom,
    selectPlayerList,
    selectPlayerIdWhoWentOut,
    selectWinnerId,
    selectIsGameInSession,
    selectValidGroups,
    selectDisplayName,
    selectRoomCode
  } = useAppSelectors();

  const classes = useStyles();
  const routes = useRoute();
  const dispatch = useDispatch();
  const [exitPage, setExitPage] = useState(false);

  const {
    hand,
    currentRound,
    dealerIdx,
    turnIdx,
    topCardInDiscard,
    usersInRoom,
    playerList,
    playerIdWhoWentOut,
    winnerId,
    isGameInSession,
    validGroups,
    displayName,
    roomCode
  } = useSelector((state: IApplicationState) => ({
    hand: selectHand(state),
    currentRound: selectCurrentRound(state),
    dealerIdx: selectDealerIdx(state),
    turnIdx: selectTurnIdx(state),
    topCardInDiscard: selectTopCardInDiscard(state),
    usersInRoom: selectUsersInRoom(state),
    playerList: selectPlayerList(state),
    playerIdWhoWentOut: selectPlayerIdWhoWentOut(state),
    winnerId: selectWinnerId(state),
    isGameInSession: selectIsGameInSession(state),
    validGroups: selectValidGroups(state),
    displayName: selectDisplayName(state),
    roomCode: selectRoomCode(state)
  }));

  const orderedPlayerData = useMemo(
    () => playerList.map(playerId => {
      const player = usersInRoom.find(user => user.id === playerId);
      if (!player) throw new Error(`Could not find ${playerId} in usersInRoom`);
      return player;
    }),
    [usersInRoom, playerList]
  );

  const isCurrentPlayersTurn = useMemo(
    () => orderedPlayerData[turnIdx].id === socket.id,
    [orderedPlayerData, turnIdx]
  );

  const playerMayDraw = useMemo(
    () => isCurrentPlayersTurn && hand.length === currentRound + 2,
    [isCurrentPlayersTurn, hand, currentRound]
  );

  const playerMayDiscard = useMemo(
    () => isCurrentPlayersTurn && hand.length === currentRound + 3,
    [isCurrentPlayersTurn, hand, currentRound]
  );

  const anotherPlayerGoneOut = useMemo(
    () => playerIdWhoWentOut !== null,
    [playerIdWhoWentOut]
  );

  const winnerPlayer = useMemo(
    () => {
      if (!winnerId) return null;
      if (Array.isArray(winnerId)) {
        return winnerId.map(tiedWinner => {
          const tiedPlayer = orderedPlayerData.find(p => p.id === tiedWinner);
          if (!tiedPlayer) throw new Error(`Cannot find one of the winner players by id ${tiedWinner}`);
          return tiedPlayer;
        });
      }
      const winner = orderedPlayerData.find(player => player.id === winnerId);
      if (!winner) throw new Error(`Cannot find winner player by id ${winnerId}`);
      return winner;
    },
    [orderedPlayerData, winnerId]
  );

  const winnerMessage = useMemo(
    () => {
      if (!winnerPlayer) return null;
      if (Array.isArray(winnerPlayer)) {
        return `The tied winners are ${winnerPlayer.map(w => `${w.name}`)}`;
      }
      return `The winner is ${winnerPlayer.name}!`;
    },
    [winnerPlayer]
  );

  const onDrawFromDeck = useCallback(() => {
    dispatch(apiDrawFromDeck());
  }, [dispatch]);

  const onDrawFromDiscard = useCallback(() => {
    dispatch(apiDrawFromDiscard());
  }, [dispatch]);

  const onDiscardFromHand = useCallback((card: ICard) => {
    console.log('discard from hand');
    dispatch(apiDiscardFromHand({ card }));
  }, [dispatch]);

  const onGoOut = useCallback((groups: ICard[][], discard: ICard) => {
    dispatch(apiGoOut({ groups, discard }));
  }, [dispatch]);

  const onLayDownCards = useCallback((groups: ICard[][], discard: ICard) => {
    dispatch(apiLayDownCards({ groups, discard }));
  }, [dispatch]);

  const onExitGamePage = useCallback(() => {
    dispatch(updateShowGameOverPage({ showGameOverPage: false }));
    setExitPage(true);
  }, [dispatch]);

  useEffect(() => {
    if (winnerId) {
      dispatch(updateShowGameOverPage({ showGameOverPage: true }));
    }
  }, [winnerId, dispatch]);

  if (exitPage) return (
    <Redirect push to={routes.room({ id: roomCode, name: displayName })} />
  );

  if (winnerPlayer && !isGameInSession) return (
    <Container className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className={classes.messageContainer}>
          <Typography align='center' variant='h4' component='h4'>
            Game Over
          </Typography>
          <Typography align='center' variant='h4' component='h4'>
            {winnerMessage}
          </Typography>
        </Grid>
        <Grid item className={classes.button}>
          <Button
            variant='contained'
            color='primary'
            onClick={onExitGamePage}>
            Return to Room
          </Button>
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <Container className={classes.root}>
      <Typography align='center' variant='h5' component='h5'>
        {`Round: ${currentRound}/11`}
      </Typography>
      <PlayerQueue
        players={orderedPlayerData}
        turnIdx={turnIdx}
        dealerIdx={dealerIdx}
        isCurrentPlayersTurn={isCurrentPlayersTurn}
        playerIdWhoWentOut={playerIdWhoWentOut}
      />
      <CardDeck
        topCardInDiscard={topCardInDiscard}
        onDrawFromDeck={onDrawFromDeck}
        onDrawFromDiscard={onDrawFromDiscard}
        playerMayDraw={playerMayDraw}
      />
      <PlayerControls
        hand={hand}
        onDiscard={onDiscardFromHand}
        onGoOut={onGoOut}
        onLayDownCards={onLayDownCards}
        playerMayDraw={playerMayDraw}
        playerMayDiscard={playerMayDiscard}
        isCurrentPlayersTurn={isCurrentPlayersTurn}
        anotherPlayerGoneOut={anotherPlayerGoneOut}
        validGroups={validGroups}
      />
    </Container>
  );
}