const initialState = {
    tiles: [],
    selectedTiles: [],
    gameOver: false,
    matchedTiles: [],
};

const generateTiles = (gridSize) => {
    const numTiles = gridSize * gridSize;
    const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan"];
    let tiles = [];

    for (let i = 0; i < numTiles / 2; i++) {
        const color = colors[i % colors.length];
        tiles.push({ id: tiles.length, color, isOpen: false });
        tiles.push({ id: tiles.length, color, isOpen: false });
    }

    return shuffleArray(tiles);
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_GAME':
            const gridSize = action.payload.gridSize || 4;
            return {
                ...state,
                tiles: generateTiles(gridSize),
                gameOver: false,
                selectedTiles: [],
                matchedTiles: [],
            };
        case 'SELECT_TILE':
            const selectedTiles = [...state.selectedTiles, action.payload];
            const newTiles = state.tiles.map((tile, index) => {
                if (index === action.payload) {
                    return { ...tile, isOpen: true };
                }
                return tile;
            });

            if (selectedTiles.length === 2) {
                const [firstTile, secondTile] = selectedTiles;
                if (state.tiles[firstTile].color === state.tiles[secondTile].color) {
                    return {
                        ...state,
                        tiles: newTiles,
                        selectedTiles: [],
                        matchedTiles: [...state.matchedTiles, firstTile, secondTile],
                    };
                } else {
                    return {
                        ...state,
                        tiles: newTiles,
                        selectedTiles,
                    };
                }
            }

            return {
                ...state,
                tiles: newTiles,
                selectedTiles,
            };
        case 'RESET_TILES':
            const resetTiles = state.tiles.map((tile, index) => {
                if (!state.matchedTiles.includes(index)) {
                    return { ...tile, isOpen: false };
                }
                return tile;
            });
            return {
                ...state,
                tiles: resetTiles,
                selectedTiles: [],
            };
        default:
            return state;
    }
};

export default rootReducer;
