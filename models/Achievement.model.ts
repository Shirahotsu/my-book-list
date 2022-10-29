import {BasicAchievementLevel} from "./Profile.model";

export type AchievementType = 'books' | 'friends' | 'pages' | 'score' | 'streak'

export interface NewAchievementDialog {
    message:string,
    level:BasicAchievementLevel
    type?:AchievementType
}
