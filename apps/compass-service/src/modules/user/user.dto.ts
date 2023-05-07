export interface UserContextDto {
  id: string;
  openid?: string;
  telephone?: string; // 需要进行掩码脱敏处理
  email?: string;
  nickname?: string;
  gender?: string;
  roles?: number[];
}
