import { useState } from 'react';
import { uid } from '../utils/uniqueId';

function useId() {
  const [id] = useState(uid());

  return [id];
}

export default useId;
