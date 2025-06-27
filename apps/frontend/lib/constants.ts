export interface MarketProps {
  id: string;
  title: string;
  image: string;
  estimatedTime: string;
  winningOdds: number;
  losingOdds: number;
}
export const predictions: MarketProps[] = [
  {
    id: "1",
    title: "Will AI achieve AGI by 2030?",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop",
    estimatedTime: "6 years left",
    winningOdds: 34,
    losingOdds: 66,
  },
  {
    id: "2",
    title: "Bitcoin to reach $100k in 2025?",
    image:
      "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=240&fit=crop",
    estimatedTime: "5 months left",
    winningOdds: 67,
    losingOdds: 33,
  },
  {
    id: "3",
    title: "SpaceX Mars mission before 2030?",
    image:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=240&fit=crop",
    estimatedTime: "4 years left",
    winningOdds: 42,
    losingOdds: 58,
  },
  {
    id: "4",
    title: "Remote work majority by 2026?",
    image:
      "https://images.unsplash.com/photo-1664475462955-7e11c224f128?w=400&h=240&fit=crop",
    estimatedTime: "1 year left",
    winningOdds: 78,
    losingOdds: 22,
  },
  {
    id: "5",
    title: "Electric cars 50% market share by 2028?",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=240&fit=crop",
    estimatedTime: "3 years left",
    winningOdds: 55,
    losingOdds: 45,
  },
  {
    id: "6",
    title: "Quantum computing breakthrough in 2025?",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=240&fit=crop",
    estimatedTime: "6 months left",
    winningOdds: 29,
    losingOdds: 71,
  },
];
