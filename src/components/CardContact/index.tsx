import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './styles';

import { remover, editar } from '../../store/reducers/contacts';
import ContatosClass from '../../models/Contatos';
import { IoPeopleCircleOutline } from 'react-icons/io5';
import { MdOutlineMail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';

type Props = ContatosClass;

const CardContact = ({
  grupos,
  titulo,
  email: emailOriginal,
  telefone: telefoneOriginal,
  id,
}: Props) => {
  const dispatch = useDispatch();
  const [editando, setEditando] = useState(false);
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    if (emailOriginal.length > 0) {
      setEmail(emailOriginal);
    }
  }, [emailOriginal]);

  useEffect(() => {
    if (telefoneOriginal.length > 0) {
      setTelefone(telefoneOriginal);
    }
  }, [telefoneOriginal]);

  function cancelarEdicao() {
    setEditando(false);
    setEmail(emailOriginal);
    setTelefone(telefoneOriginal);
  }

  return (
    <S.CarddeContatos>
      <div style={{ display: 'flex' }}>
        <div>
          <S.Tag grupos={grupos}>{grupos}</S.Tag>
          {editando && (
            <em
              style={{
                backgroundColor: '#C5233B',
                color: '#fff',
                padding: '.25rem .50rem',
                borderRadius: '4px',
                marginLeft: '1rem',
                marginTop: '-8rem',
                fontWeight: '600',
                fontSize: '.75rem',
              }}
            >
              Editando...{' '}
            </em>
          )}
          <S.MyDiv>
            <IoPeopleCircleOutline
              style={{ fontSize: '1.25rem', marginRight: '.50rem' }}
            />
            <S.MyTitle value={titulo}>{titulo}</S.MyTitle>
          </S.MyDiv>
          <S.MyDiv>
            <MdOutlineMail
              style={{ fontSize: '1rem', marginRight: '.75rem' }}
            />
            <S.Email
              disabled={!editando}
              value={email}
              onChange={(evento: React.ChangeEvent<HTMLTextAreaElement>) =>
                setEmail(evento.target.value)
              }
            />
          </S.MyDiv>
          <S.MyDiv>
            <FaPhoneAlt style={{ fontSize: '0.75rem', marginRight: '1rem' }} />
            <S.TelPhone
              disabled={!editando}
              value={telefone}
              onChange={(evento: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTelefone(evento.target.value)
              }
            />
          </S.MyDiv>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <IoPeopleCircleOutline
            style={{ fontSize: '6.5rem', opacity: '10%' }}
          />
        </div>
      </div>
      <S.ActionBar>
        {editando ? (
          <>
            <S.btnSalvar
              onClick={() => {
                dispatch(
                  editar({
                    grupos,
                    titulo,
                    telefone,
                    email,
                    id,
                  })
                );
                setEditando(false);
              }}
            >
              Salvar
            </S.btnSalvar>
            <S.Btn onClick={cancelarEdicao}>Cancelar</S.Btn>
          </>
        ) : (
          <>
            <S.btnEditar onClick={() => setEditando(true)}>Editar</S.btnEditar>
            <S.BtncancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BtncancelarRemover>
          </>
        )}
      </S.ActionBar>
    </S.CarddeContatos>
  );
};

export default CardContact;
