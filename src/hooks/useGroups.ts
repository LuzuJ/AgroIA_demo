import { useState, useEffect } from 'react';
import { container } from '../config';
import { Group } from '../models';

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGroups = async () => {
    try {
      setLoading(true);
      const data = await container.groupController.getAllGroups();
      setGroups(data);
      setError(null);
    } catch (err) {
      setError('Error loading groups');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const toggleJoin = async (groupId: string) => {
    try {
      const updated = await container.groupController.toggleJoinGroup(groupId);
      if (updated) {
        setGroups(prev =>
          prev.map(g => (g.id === groupId ? updated : g))
        );
      }
    } catch (err) {
      console.error('Error toggling group join:', err);
    }
  };

  const getJoinedGroups = async () => {
    try {
      setLoading(true);
      const data = await container.groupController.getJoinedGroups();
      setGroups(data);
    } catch (err) {
      console.error('Error getting joined groups:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    groups,
    loading,
    error,
    toggleJoin,
    getJoinedGroups,
    refresh: loadGroups,
  };
}
