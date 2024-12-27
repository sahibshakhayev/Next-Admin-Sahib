import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, Create } from 'react-admin';

// List view for languages
export const LanguageList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="code" />
            <TextField source="name" />
            <TextField source="country" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// Edit form for languages
export const LanguageEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="code" />
            <TextInput source="name" />
            <TextInput source="country" />
        </SimpleForm>
    </Edit>
);

// Create form for languages
export const LanguageCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="code" required />
            <TextInput source="name" required/>
            <TextInput source="country" required/>
        </SimpleForm>
    </Create>
);
