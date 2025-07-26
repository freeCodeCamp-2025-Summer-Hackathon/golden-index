import { EventType } from '@/components/events-card';
import { create } from 'zustand';

interface EventStore {
    events: EventType[]
    isLoading: boolean
    error: unknown | null
    hasFetched: boolean
    fetchEvents: (token: string) => Promise<void>
}

interface EventsResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  totalItems: number;
  member: EventType[];
}

const useEventStore = create<EventStore>((set) => ({
    events: [],
    isLoading: false,
    error: null,
    hasFetched: false,

    fetchEvents: async (token: string) => {
        set({ isLoading: true, error: null });
        try {
            const res = await fetch('/api/events', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!res.ok) throw new Error('Failed to fetch events');

            const data: EventsResponse = await res.json();
            set({ events: data.member || [], isLoading: false, hasFetched: true });
        }
        catch (error) {
            set({ isLoading: false, error: error || 'Failed to fetch events', events: [] });
        }
    }
}))

export default useEventStore;