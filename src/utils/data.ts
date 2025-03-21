
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from "sonner";

export interface Insult {
  id: string;
  text: string;
  author: string;
  votes: number;
  createdAt: Date;
}

interface InsultStore {
  insults: Insult[];
  addInsult: (text: string, author: string) => void;
  addVote: (id: string) => void;
  getInsultById: (id: string) => Insult | undefined;
  getTopInsults: (limit?: number) => Insult[];
}

export const useInsultStore = create<InsultStore>()(
  persist(
    (set, get) => ({
      insults: [
        {
          id: '1',
          text: 'Ты так логично мыслишь, что даже калькулятор завидует',
          author: 'Аноним',
          votes: 15,
          createdAt: new Date('2023-05-10'),
        },
        {
          id: '2',
          text: 'Твое лицо настолько красивое, что даже Мона Лиза перестала улыбаться',
          author: 'Аноним',
          votes: 23,
          createdAt: new Date('2023-05-11'),
        },
        {
          id: '3',
          text: 'Твой IQ настолько высок, что температура в комнате повышается, когда ты входишь',
          author: 'Аноним',
          votes: 8,
          createdAt: new Date('2023-05-12'),
        },
      ],
      addInsult: (text, author) => {
        const newInsult: Insult = {
          id: Date.now().toString(),
          text,
          author: author || 'Аноним',
          votes: 0,
          createdAt: new Date(),
        };

        set((state) => ({
          insults: [newInsult, ...state.insults],
        }));

        toast.success("Ваше ругательство добавлено!");
        return newInsult;
      },
      addVote: (id) => {
        set((state) => ({
          insults: state.insults.map((insult) =>
            insult.id === id ? { ...insult, votes: insult.votes + 1 } : insult
          ),
        }));
      },
      getInsultById: (id) => {
        return get().insults.find((insult) => insult.id === id);
      },
      getTopInsults: (limit = 10) => {
        return [...get().insults]
          .sort((a, b) => b.votes - a.votes)
          .slice(0, limit);
      },
    }),
    {
      name: 'insult-storage',
    }
  )
);
