import { baseQuery } from '@shared/api/baseQuery';
import { getProfile } from '@shared/api/profileApi';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => baseQuery(getProfile),
  });
};
