export interface Concept {
  id: string;
  name: string;
  category: string;
  summary: string;
  example: string;
}

export interface Customer {
  id: string;
  name: string;
  avatar: string;
  title: string;
  dialogue: string;
  orderText: string;
  tipMultiplier: number;
}

export interface TestCase {
  id: string;
  description: string;
  testFn: (consoleOutput: string[], returnedValue: any, scope: Record<string, any>) => boolean;
}

export interface Lesson {
  day: number;
  conceptId: string;
  title: string;
  conceptName: string;
  story: string;
  explanation: string;
  javaJoeTip: string;
  customer: Customer;
  starterCode: string;
  solutionCode: string;
  testCases: {
    description: string;
    validate: (logs: string[], result: any, windowScope?: any) => boolean;
  }[];
  dailyTargetMoney: number; // min $ to complete day
  rewardMoney: number;
  unlockedUpgradeId?: string;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  incomeBonusPercent: number;
  category: 'equipment' | 'beans' | 'decor' | 'marketing';
  purchased: boolean;
}

export interface StoreLocation {
  id: string;
  name: string;
  requiredDay: number;
  requiredCash: number;
  description: string;
  unlocked: boolean;
  image: string;
}

export interface GameState {
  currentDay: number; // 1 to 28
  cash: number;
  totalCustomersServed: number;
  dayCustomersServed: number; // quota per day target is 3
  currentStoreId: string;
  purchasedUpgrades: string[];
  completedDays: number[];
  soundEnabled: boolean;
  gameStatus: 'playing' | 'day_complete' | 'bankrupt' | 'game_victory';
  activeTab: 'barista' | 'codex' | 'upgrades' | 'franchise';
}

export interface RunResult {
  success: boolean;
  logs: string[];
  result: any;
  error: string | null;
  testsPassed: boolean[];
  testResults: { description: string; passed: boolean }[];
}
