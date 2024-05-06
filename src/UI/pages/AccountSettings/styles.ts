import { FormControl } from "@mui/material";
import styled from "styled-components";

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  .avatar-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }

  .name {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.secundary};
  }

  .email {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text_descriptions};
  }

  .store {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.secundary};
  }
`;

export const SubscriptionForm = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const SubscriptionInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.input_background};
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  .title {
    font-size: 1.1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.secundary};
  }

  .status,
  .expire {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;

export const InputInfo = styled.p`
  margin-bottom: 0.5rem;
`;
