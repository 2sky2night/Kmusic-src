import { MV } from "@/api/public/indexfaces";

/**
 * 收藏的mv /mv/sublist
 */
export interface StarMvRes {
    code: number;
    data: MV[];
    hasMore: boolean;
}
