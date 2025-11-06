'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Container } from './container';
import { Separator } from '@/components/ui/separator';

/**
 * Footer component
 * Site footer with links, social media, and copyright
 */
export function Footer() {
    const t = useTranslations();
    const locale = useLocale();
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: t('footer.about', { default: 'About' }), href: `/${locale}/about` },
            { name: t('footer.blog', { default: 'Blog' }), href: `/${locale}/blog` },
            { name: t('footer.careers', { default: 'Careers' }), href: `/${locale}/careers` },
        ],
        support: [
            { name: t('footer.help', { default: 'Help Center' }), href: `/${locale}/help` },
            { name: t('footer.contact', { default: 'Contact' }), href: `/${locale}/contact` },
            { name: t('footer.faq', { default: 'FAQ' }), href: `/${locale}/faq` },
        ],
        legal: [
            { name: t('footer.privacy', { default: 'Privacy Policy' }), href: `/${locale}/privacy` },
            { name: t('footer.terms', { default: 'Terms of Service' }), href: `/${locale}/terms` },
            { name: t('footer.cookies', { default: 'Cookie Policy' }), href: `/${locale}/cookies` },
        ],
    };

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
        { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
        { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
        { name: 'Email', icon: Mail, href: 'mailto:info@relaxbro.com' },
    ];

    return (
        <footer className="border-t bg-muted/30">
            <Container>
                <div className="py-12">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Brand Section */}
                        <div className="space-y-4">
                            <Link href={`/${locale}`} className="flex items-center space-x-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-primary-500 to-primary-600 text-white shadow-md">
                                    <span className="text-xl font-bold">R</span>
                                </div>
                                <span className="text-xl font-bold">RelaxBro</span>
                            </Link>
                            <p className="text-sm text-muted-foreground">
                                {t('footer.description', {
                                    default: 'Discover the best places for relaxation and recreation.',
                                })}
                            </p>
                            {/* Social Links */}
                            <div className="flex space-x-3">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span className="sr-only">{social.name}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h3 className="mb-4 text-sm font-semibold">
                                {t('footer.company', { default: 'Company' })}
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div>
                            <h3 className="mb-4 text-sm font-semibold">
                                {t('footer.support', { default: 'Support' })}
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.support.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal Links */}
                        <div>
                            <h3 className="mb-4 text-sm font-semibold">
                                {t('footer.legal', { default: 'Legal' })}
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    {/* Bottom Footer */}
                    <div className="flex flex-col items-center justify-between space-y-4 text-center text-sm text-muted-foreground sm:flex-row sm:space-y-0 sm:text-left">
                        <p>
                            © {currentYear} RelaxBro.{' '}
                            {t('footer.rights', { default: 'All rights reserved.' })}
                        </p>
                        <p className="text-xs">
                            {t('footer.madeWith', { default: 'Made with' })} ❤️{' '}
                            {t('footer.in', { default: 'in' })} Barcelona
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
