import { Link } from 'react-router-dom';

interface Breadcrumb {
	label: string;
	href: string;
	active?: boolean;
}

export const Breadcrumbs = ({ breadcrumbs }: {breadcrumbs: Breadcrumb[]}) => {
	return (
		<nav aria-label='Breadcrumb' className='mb-6 ml-10 mt-5 block'>
			<ol className='flex text-xl md:text-2xl'>
				{breadcrumbs.map((breadcrumb, index) => (
					<li
						key={breadcrumb.href}
						aria-current={breadcrumb.active}
						className={breadcrumb.active ? 'text-gray-900' : 'text-gray-500'}
					>
						<Link to={breadcrumb.href}>{breadcrumb.label}</Link>
						{index < breadcrumbs.length - 1 && <span className="mx-3 inline-block">/</span>}
					</li>
				))}
			</ol>
		</nav>
	);
};