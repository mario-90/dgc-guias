import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const menuResponse = await axios.get('http://localhost:1337/menus.menus');
                const menuItemsResponse = await axios.get('http://localhost:1337/MenuItem');
                setMenu(menuResponse.data);
                setMenuItems(menuItemsResponse.data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchMenuData();
    }, []);

    if (menu.length === 0 || menuItems.length === 0) return <p>Loading menu...</p>;

    return (

        <>
            <nav>
                {menu.map(menuItem => (
                    <div key={menuItem.id}>
                        <h2>{menuItem.title}</h2>
                        <ul>
                            {menuItems
                                .filter(item => item.menu.id === menuItem.id)
                                .map(item => (
                                    <li key={item.id}>
                                        <a href={item.url}>{item.label}</a>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </>
    );
};

export default Menu;
