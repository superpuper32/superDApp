import { NavLink } from 'react-router-dom';

import { StyledNav } from './Nav.styled';

type PageType = {
    id: number,
    to: string,
    name: string,
}

const pages: PageType[] = [
    { id: 0, to: '/', name: 'Main'  },
    { id: 1, to: '/swap', name: 'Swap'  },
    { id: 2, to: '/gecko', name: 'Gecko' },
    { id: 3, to: '/contracts', name: 'Contracts' },
];

const Nav = (): JSX.Element => {

    return (
        <StyledNav>
            {pages.map((page, ) => (
                <NavLink
                    key={page.id}
                    to={page.to}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >{page.name}</NavLink>
            ))}
        </StyledNav>
    );
};

export default Nav;