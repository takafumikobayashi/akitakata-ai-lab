<script lang="ts">
	import { organizerLinks } from '#lib/data/site.js';
	import { socialIcons } from '#lib/data/social-icons.js';

	let { class: className = '' }: { class?: string } = $props();
</script>

{#if organizerLinks.length}
	<ul class={['social-links', className]} aria-label="小林崇文のSNS">
		{#each organizerLinks as link (link.label)}
			{@const icon = socialIcons[link.label]}
			<li>
				<a
					href={link.url}
					target="_blank"
					rel="external noopener noreferrer me"
					aria-label={`${link.label}（新しいタブで開きます）`}
					title={link.label}
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
