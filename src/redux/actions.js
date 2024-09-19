export const initGame = (gridSize = 4, difficulty = 1) => ({
    type: "INIT_GAME",
    payload: {
        gridSize,
        difficulty,
    }
});

export const selectTile = (index) => ({
    type: 'SELECT_TILE',
    payload: index,
});

export const resetTiles = () => ({
    type: 'RESET_TILES',
});
