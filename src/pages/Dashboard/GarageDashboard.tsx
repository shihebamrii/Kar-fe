import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { garageService } from '../../services/garageService';
import type { User } from '../../types/api';
import { toast } from 'react-toastify';
import {
    Container,
    Heading,
    Text,
    Button,
    Card,
    Flex,
    Box,
    TextField,
    Table,
    Dialog,
    Badge,
    IconButton
} from '@radix-ui/themes';
import {
    PlusIcon,
    PersonIcon,
    TrashIcon,
    ExitIcon
} from '@radix-ui/react-icons';

const GarageDashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await garageService.getUsers();
            if (response.success && response.data) {
                setUsers(response.data);
            } else {
                toast.error(response.message || 'Failed to fetch users');
            }
        } catch (error) {
            toast.error('An error occurred while fetching users');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async () => {
        if (!newUser.username || !newUser.email || !newUser.password) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            const response = await garageService.createUser(newUser);
            if (response.success && response.data) {
                toast.success('User created successfully');
                setUsers([...users, response.data]);
                setIsCreateOpen(false);
                setNewUser({ username: '', email: '', password: '' });
            } else {
                toast.error(response.message || 'Failed to create user');
            }
        } catch (error) {
            toast.error('An error occurred while creating user');
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await garageService.deleteUser(id);
                if (response.success) {
                    toast.success('User deleted successfully');
                    setUsers(users.filter(u => u.id !== id));
                } else {
                    toast.error(response.message || 'Failed to delete user');
                }
            } catch (error) {
                toast.error('An error occurred while deleting user');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <Container size="4" className="py-4">
                    <Flex justify="between" align="center">
                        <Flex align="center" gap="3">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <PersonIcon className="w-6 h-6 text-white" />
                            </div>
                            <Box>
                                <Heading size="4" className="text-gray-900">Garage Dashboard</Heading>
                                <Text size="2" color="gray">Welcome back, {user?.username}</Text>
                            </Box>
                        </Flex>
                        <Button variant="soft" color="gray" onClick={logout}>
                            <ExitIcon className="mr-2" />
                            Sign Out
                        </Button>
                    </Flex>
                </Container>
            </header>

            <Container size="4" className="py-8">
                <Flex justify="between" align="center" className="mb-6">
                    <Heading size="6">My Clients</Heading>
                    <Dialog.Root open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <Dialog.Trigger>
                            <Button size="3">
                                <PlusIcon className="mr-2" />
                                Add New Client
                            </Button>
                        </Dialog.Trigger>

                        <Dialog.Content style={{ maxWidth: 450 }}>
                            <Dialog.Title>Add New Client</Dialog.Title>
                            <Dialog.Description size="2" mb="4">
                                Create a new client account. They will be linked to your garage.
                            </Dialog.Description>

                            <Flex direction="column" gap="3">
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">Username</Text>
                                    <TextField.Root
                                        placeholder="Enter username"
                                        value={newUser.username}
                                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                    />
                                </label>
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">Email</Text>
                                    <TextField.Root
                                        placeholder="Enter email"
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    />
                                </label>
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">Password</Text>
                                    <TextField.Root
                                        placeholder="Enter password"
                                        type="password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    />
                                </label>
                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Button onClick={handleCreateUser}>Save Client</Button>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>
                </Flex>

                {loading ? (
                    <Flex justify="center" py="9">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </Flex>
                ) : (
                    <Card>
                        <Table.Root>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {users.length === 0 ? (
                                    <Table.Row>
                                        <Table.Cell colSpan={4} align="center">
                                            <Text color="gray">No clients found. Add your first client!</Text>
                                        </Table.Cell>
                                    </Table.Row>
                                ) : (
                                    users.map((client) => (
                                        <Table.Row key={client.id}>
                                            <Table.Cell>
                                                <Flex align="center" gap="2">
                                                    <PersonIcon />
                                                    <Text weight="bold">{client.username}</Text>
                                                </Flex>
                                            </Table.Cell>
                                            <Table.Cell>{client.email}</Table.Cell>
                                            <Table.Cell>
                                                <Badge color="blue">{client.role}</Badge>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Flex gap="2">
                                                    <IconButton color="red" variant="soft" onClick={() => handleDeleteUser(client.id)}>
                                                        <TrashIcon />
                                                    </IconButton>
                                                </Flex>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                )}
                            </Table.Body>
                        </Table.Root>
                    </Card>
                )}
            </Container>
        </div>
    );
};

export default GarageDashboard;
