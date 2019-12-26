import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import {BookCreate, BookEdit, BookList} from './components/books';
import {MemberCreate, MemberEdit, MemberList} from "./components/members";
import jsonServerProvider from 'ra-data-json-server';
import UserIcon from '@material-ui/icons/People';
import BookIcon from '@material-ui/icons/MenuBook';

// js はクライアントサイドで実行されるので、docker起動でもlocalhostでアクセスできる
const dataProvider = jsonServerProvider('http://localhost:8080');

const App = () => (
	<Admin dataProvider={dataProvider}>
		<Resource
			name="books"
			list={BookList}
			edit={BookEdit}
			create={BookCreate}
			icon={BookIcon}
		/>
		<Resource
			name="members"
			list={MemberList}
			edit={MemberEdit}
			create={MemberCreate}
			icon={UserIcon}
		/>
	</Admin>
);

export default App;
