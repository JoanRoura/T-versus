import { Tournament } from "src/app/tournaments/interfaces/tournament.interface";

export const findIndexById = (tournaments: Tournament[], id: string): number => {
    let index = -1;
    
    for (let i = 0; i < tournaments.length; i++) {
        if (tournaments[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}