import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle}) {
    useEffect(() => {
        console.log('컴포넌트가 화면에 나타남');
        return () => {
            console.log('컴포넌트가 화면에서 사라짐');
        };
    }, []); // 첫 번째 파라미터는 함수, 두 번째 파라미터는 의존값이 들어있는 배열 (deps) deps를 비우면 컴포넌트가 처음 나타날 때에만 userEffect에 등록한 함수가 호출된다. 
        // deps가 비어있는 경우 컴포넌트가 사라질 때 cleanup 함수가 호출된다. 



  return (
    <div>
      <b
        style={{
            cursor: 'pointer',
            color: user.active ? 'green' : 'black'
        }}
        onClick={()=> onToggle(user.id)}
        >{user.username}</b> 
        <span>({user.email})</span>
        <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default React.memo(UserList);