export interface Path {
  path: string;
  label: string;
  child: Path[] | null;
}