<script lang="ts">
	import { discord, organizerLinks } from '#lib/data/site.js';
	import { socialIcons } from '#lib/data/social-icons.js';

	// community: Labの Discord（申請制）も並べる。主催者個人のSNSではないため rel="me" は付けない
	let { class: className = '', community = false }: { class?: string; community?: boolean } =
		$props();

	const links = $derived([
		...organizerLinks.map((link) => ({ ...link, name: link.label, rel: 'me' })),
		...(community
			? [{ label: 'Discord', name: 'Discordコミュニティ（申請制）', url: discord.url, rel: '' }]
			: [])
	]);
</script>

{#if links.length}
	<ul
		class={['social-links', className]}
		aria-label={community ? '小林崇文のSNSとLabのDiscord' : '小林崇文のSNS'}
	>
		{#each links as link (link.label)}
			{@const icon = socialIcons[link.label]}
			<li>
				<a
					href={link.url}
					target="_blank"
					rel="external noopener noreferrer {link.rel}"
					aria-label={`${link.name}（新しいタブで開きます）`}
					title={link.name}
				>
					<svg
						viewBox={icon.viewBox}
						style:--icon-size={icon.size ? `${icon.size}px` : undefined}
						aria-hidden="true"
					>
						{#each icon.paths as d (d)}
							<path {d} />
						{/each}
					</svg>
				</a>
			</li>
		{/each}
	</ul>
{/if}
