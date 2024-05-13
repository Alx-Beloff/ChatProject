import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { addSpotThunk } from '../../redux/slices/spots/spotsThunks';
import type { SpotFormType } from '../../types/spotType';

export default function AddSpotForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<SpotFormType>({
    name: '',
    address: '',
    description: '',
    img: '',
  });

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="form-container">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          void dispatch(addSpotThunk(input));
          setInput({ name: '', address: '', description: '', img: '' });
        }}
      >
        <h2 className="form-title">Добавить новое место</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Название"
            onChange={changeHandler}
            value={input.name}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Адрес"
            onChange={changeHandler}
            value={input.address}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Описание"
            onChange={changeHandler}
            value={input.description}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="img"
            className="form-control"
            placeholder="Картинка"
            onChange={changeHandler}
            value={input.img}
          />
        </div>
        <button type="submit" className="btn-submit">
          Добавить
        </button>
      </form>
    </div>
  );
}
