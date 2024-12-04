import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Contatos from '../../models/Contatos';
import * as enums from '../../utils/contato/contatos';

type ContatosState = {
  itens: Contatos[];
};

const initialState: ContatosState = {
  itens: [
    {
      grupos: enums.Grupos.WORK,
      titulo: 'josi',
      telefone: '12-123456789',
      email: 'josi@gmail.com',
      id: 1,
    },
    {
      grupos: enums.Grupos.FAMILY,
      titulo: 'João',
      telefone: '12-1234567889',
      email: 'joaov@gmail.com',
      id: 2,
    },
    {
      grupos: enums.Grupos.GUYS,
      titulo: 'mae',
      telefone: '12-123456789',
      email: 'mae@gmail.com',
      id: 3,
    },
    {
      grupos: enums.Grupos.FAMILY,
      titulo: 'rosi',
      telefone: '12-123456789',
      email: 'rosi@gmail.com',
      id: 4,
    },
    {
      grupos: enums.Grupos.FAMILY,
      titulo: 'duda',
      telefone: '12-123456789',
      email: 'duda@gmail.com',
      id: 5,
    },
    {
      grupos: enums.Grupos.GUYS,
      titulo: 'pedro',
      telefone: '12-123456789',
      email: 'pedro@gmail.com',
      id: 6,
    },
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter(
        (contato) => contato.id !== action.payload
      );
    },
    editar: (state, action: PayloadAction<Contatos>) => {
      const indexContato = state.itens.findIndex(
        (contato) => contato.id === action.payload.id
      );
      if (indexContato >= 0) {
        state.itens[indexContato] = action.payload;
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Contatos, 'id'>>) => {
      const contatoExiste = state.itens.find(
        (contato) =>
          contato.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      );
      if (contatoExiste) {
        alert('Já Existe um contato com esse nome "ou" Descrição');
      } else {
        const ultimoContato = state.itens[state.itens.length - 1];
        const contatoNovo = {
          ...action.payload,
          id: ultimoContato ? ultimoContato.id + 1 : 1,
        };
        state.itens.push(contatoNovo);
      }
    },
  },
});

export const { remover, editar, cadastrar } = contactsSlice.actions;
export default contactsSlice.reducer;
