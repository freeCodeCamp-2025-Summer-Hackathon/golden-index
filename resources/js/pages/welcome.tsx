import AppearanceToggle from '@/components/appearance-toggle';
import { Badge } from '@/components/ui/badge'; 
import { Button } from '@/components/ui/button'; 
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input'; 
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; 
import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Building2, Calendar, CheckCircle, Clock, Menu, Star, TrendingUp, UserCheck, Users } from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gray-50 p-6 text-gray-900 lg:justify-start lg:p-8 dark:bg-gray-950 dark:text-gray-50">
                <header className="sticky top-0 z-50 flex h-16 w-full max-w-full items-center justify-between border-b bg-white/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-white/60 lg:px-6 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
                    <Link className="flex items-center justify-center py-4" href="/">
                        <img src="/vm-logo.png" alt="VolunteerMatch Logo" className="h-8 w-8" />
                        <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-gray-50">VolunteerMatch</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden flex-1 justify-center gap-4 sm:flex sm:gap-6">
                        <Link className="text-sm font-medium transition-colors hover:text-gray-700 dark:hover:text-gray-300" href="#features">
                            Features
                        </Link>
                        <Link className="text-sm font-medium transition-colors hover:text-gray-700 dark:hover:text-gray-300" href="#how-it-works">
                            How It Works
                        </Link>
                        <Link className="text-sm font-medium transition-colors hover:text-gray-700 dark:hover:text-gray-300" href="#impact">
                            Impact
                        </Link>
                    </nav>

                    {/* Desktop Auth Buttons and Appearance Tabs */}
                    <div className="hidden items-center gap-4 sm:flex">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-gray-300 px-5 py-1.5 text-sm leading-normal text-gray-900 hover:border-gray-400 dark:border-gray-700 dark:text-gray-50 dark:hover:border-gray-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-gray-900 hover:border-gray-300 dark:text-gray-50 dark:hover:border-gray-700"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-gray-300 px-5 py-1.5 text-sm leading-normal text-gray-900 hover:border-gray-400 dark:border-gray-700 dark:text-gray-50 dark:hover:border-gray-500"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        <AppearanceToggle />
                    </div>

                    {/* Mobile Hamburger Menu */}
                    <div className="sm:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6 text-gray-900 dark:text-gray-50" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[250px] bg-white sm:w-[300px] dark:bg-gray-950">
                                <Link className="flex items-center justify-center py-4 mt-5" href="/">
                                    <img src="/vm-logo.png" alt="VolunteerMatch Logo" className="h-8 w-8" />
                                    <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-gray-50">VolunteerMatch</span>
                                </Link>
                                <nav className="flex flex-col gap-4 pt-6 ml-5 mr-5">
                                    <Link
                                        className="py-2 text-lg font-medium transition-colors hover:text-gray-700 dark:hover:text-gray-300"
                                        href="#features"
                                    >
                                        Features
                                    </Link>
                                    <Link
                                        className="py-2 text-lg font-medium transition-colors hover:text-gray-700 dark:hover:text-gray-300"
                                        href="#how-it-works"
                                    >
                                        How It Works
                                    </Link>
                                    <Link
                                        className="py-2 text-lg font-medium transition-colors hover:text-gray-700 dark:hover:text-gray-300"
                                        href="#impact"
                                    >
                                        Impact
                                    </Link>
                                    {auth.user ? (
                                        <Button asChild variant="outline" className="mt-4 w-full bg-transparent">
                                            <Link href={route('dashboard')}>Dashboard</Link>
                                        </Button>
                                    ) : (
                                        <>
                                            <Button asChild variant="outline" className="mt-4 w-full bg-transparent">
                                                <Link href={route('login')}>Log in</Link>
                                            </Button>
                                            <Button
                                                asChild
                                                className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                                            >
                                                <Link href={route('register')}>Register</Link>
                                            </Button>
                                        </>
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="w-full max-w-4xl space-y-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:py-16">
                    <motion.div
                        className="flex flex-col items-center gap-4 text-center"
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="space-y-4">
                            <Badge variant="secondary" className="rounded-full bg-[#C8A74B] px-4 py-2 text-xs sm:text-sm">
                                Connecting Hearts, Building Communities
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl/none dark:text-gray-50">
                                Make a Difference in Your Community
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Connect with local volunteer opportunities, track your impact, and build meaningful relationships. Whether you're an
                                organization seeking help or a volunteer ready to serve, we bring communities together.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="flex-1 bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                            >
                                Find Opportunities
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="flex-1 bg-transparent dark:bg-gray-700">
                                Post an Event
                            </Button>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-3">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">10K+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Active Volunteers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">500+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Organizations</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">50K+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Hours Logged</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section id="features" className="w-full max-w-4xl space-y-6 py-8 md:py-12 lg:py-16">
                    <motion.div
                        className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Built for Everyone in the Community</h2>
                        <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Our platform serves organizations, volunteers, and community members with powerful tools to create lasting impact.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid gap-6 lg:grid-cols-3"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp}>
                            <Card className="h-full bg-gray-50 transition-shadow hover:shadow-lg dark:bg-gray-950">
                                <div className="mb-4 flex flex-col items-center justify-center space-y-4 text-center">
                                    <Building2 className="mb-4 h-12 w-12 text-gray-700 dark:text-gray-300" />
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">For Organizations</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Post events, manage volunteers, and track your community impact
                                    </div>
                                </div>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm">Post events with specific roles</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm">Set requirements and skills needed</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm">Manage volunteer applications</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm">Track event success metrics</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <Card className="h-full bg-gray-50 transition-shadow hover:shadow-lg dark:bg-gray-950">
                                <div className="mb-4 flex flex-col items-center justify-center space-y-4 text-center">
                                    <UserCheck className="mb-4 h-12 w-12 text-gray-700 dark:text-gray-300" />
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">For Volunteers</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Discover opportunities, check in easily, and log your service hours
                                    </div>
                                </div>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm">Browse local opportunities</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm">Quick sign-up process</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm">Easy check-in at events</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm">Automatic time tracking</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <Card className="h-full bg-gray-50 transition-shadow hover:shadow-lg dark:bg-gray-950">
                                <div className="mb-4 flex flex-col items-center justify-center space-y-4 text-center">
                                    <BarChart3 className="mb-4 h-12 w-12 text-gray-700 dark:text-gray-300" />
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">Track Your Impact</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Build your volunteer resume and see your community impact grow
                                    </div>
                                </div>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm">Personal volunteer dashboard</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm">Detailed impact statistics</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm">Downloadable volunteer resume</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-sm">Achievement badges and rewards</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="w-full max-w-4xl space-y-6 bg-gray-50 py-8 md:py-12 lg:py-16 dark:bg-gray-950">
                    <motion.div
                        className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                        <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Getting started is simple. Follow these easy steps to begin making a difference in your community.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid gap-8 md:grid-cols-3"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">1</span>
                            </div>
                            <h3 className="mb-2 text-xl font-bold">Sign Up</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Create your account in minutes. Tell us about your interests and availability.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">2</span>
                            </div>
                            <h3 className="mb-2 text-xl font-bold">Find & Join</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Browse local opportunities that match your skills and schedule. Sign up instantly.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">3</span>
                            </div>
                            <h3 className="mb-2 text-xl font-bold">Make Impact</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Check in at events, serve your community, and watch your impact grow over time.
                            </p>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Impact Stats Section */}
                <section id="impact" className="w-full max-w-4xl space-y-6 py-8 md:py-12 lg:py-16 dark:bg-gray-950">
                    <motion.div
                        className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Community Impact</h2>
                        <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Together, we're building stronger communities one volunteer hour at a time.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid gap-8 md:grid-cols-4"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center">
                            <Users className="mx-auto mb-4 h-12 w-12 text-[#f06525]" />
                            <div className="mb-2 text-4xl font-bold">10,247</div>
                            <div className="">Active Volunteers</div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <Calendar className="mx-auto mb-4 h-12 w-12 text-[#51b59f]" />
                            <div className="mb-2 text-4xl font-bold">1,856</div>
                            <div className="">Events Completed</div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <Clock className="mx-auto mb-4 h-12 w-12 text-[#ffde59]" />
                            <div className="mb-2 text-4xl font-bold">52,891</div>
                            <div className="">Hours Served</div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <TrendingUp className="mx-auto mb-4 h-12 w-12 text-[#5271ff]" />
                            <div className="mb-2 text-4xl font-bold">$1.2M</div>
                            <div className="">Community Value</div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Testimonials Section */}
                <section className="w-full max-w-4xl space-y-6 py-8 md:py-12 lg:py-16">
                    <motion.div
                        className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Community Says</h2>
                    </motion.div>

                    <motion.div
                        className="grid gap-6 md:grid-cols-3"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp}>
                            <Card className="bg-gray-50 dark:bg-gray-950">
                                <CardContent className="pt-6">
                                    <div className="mb-4 flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-[#C8A74B] text-[#C8A74B]" />
                                        ))}
                                    </div>
                                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                                        "VolunteerMatch made it so easy to find meaningful volunteer opportunities in my area. I've logged over 100
                                        hours and made amazing friends!"
                                    </p>
                                    <div className="flex items-center">
                                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                            <span className="font-semibold text-gray-900 dark:text-gray-50">SM</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Sarah Martinez</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Volunteer</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <Card className="bg-gray-50 dark:bg-gray-950">
                                <CardContent className="pt-6">
                                    <div className="mb-4 flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-[#C8A74B] text-[#C8A74B]" />
                                        ))}
                                    </div>
                                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                                        "As a nonprofit director, this platform has been a game-changer. We can easily post events and manage our
                                        volunteer base efficiently."
                                    </p>
                                    <div className="flex items-center">
                                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                            <span className="font-semibold text-gray-900 dark:text-gray-50">MJ</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Michael Johnson</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Nonprofit Director</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <Card className="bg-gray-50 dark:bg-gray-950">
                                <CardContent className="pt-6">
                                    <div className="mb-4 flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-[#C8A74B] text-[#C8A74B]" />
                                        ))}
                                    </div>
                                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                                        "The impact tracking feature is incredible. Seeing my volunteer resume grow motivates me to keep giving back
                                        to the community."
                                    </p>
                                    <div className="flex items-center">
                                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                            <span className="font-semibold text-gray-900 dark:text-gray-50">AL</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Amanda Lee</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Community Volunteer</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </section>

                {/* CTA Section */}
                <section className="w-full max-w-4xl space-y-6 bg-gray-50 py-8 md:py-12 lg:py-16 dark:bg-gray-950">
                    <motion.div
                        className="flex flex-col items-center justify-center space-y-4 text-center"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Make a Difference?</h2>
                        <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Join thousands of volunteers and organizations already making an impact in their communities.
                        </p>
                        <div className="w-full max-w-sm space-y-2">
                            <form className="flex gap-2">
                                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                                <Button
                                    type="submit"
                                    className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                                >
                                    Get Started
                                </Button>
                            </form>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Free to join. Start making an impact today.</p>
                        </div>
                        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                            >
                                <Users className="mr-2 h-4 w-4" />
                                Join as Volunteer
                            </Button>
                            <Button size="lg" variant="outline" className="dark:bg-gray-700">
                                <Building2 className="mr-2 h-4 w-4" />
                                Register Organization
                            </Button>
                        </div>
                    </motion.div>
                </section>
            </div>
            {/* Footer */}
            <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t bg-gray-50 px-4 py-6 sm:flex-row md:px-6 dark:bg-gray-900">
                <div className="flex items-center">
                    <img src="/vm-logo.png" alt="VolunteerMatch Logo" className="mr-2 h-8 w-8" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 VolunteerMatch. Building stronger communities together.</p>
                </div>
                <nav className="flex gap-4 sm:ml-auto sm:gap-6">
                    <Link className="text-xs text-gray-500 underline-offset-4 hover:underline dark:text-gray-400" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs text-gray-500 underline-offset-4 hover:underline dark:text-gray-400" href="#">
                        Privacy Policy
                    </Link>
                    <Link className="text-xs text-gray-500 underline-offset-4 hover:underline dark:text-gray-400" href="#">
                        Contact Us
                    </Link>
                </nav>
            </footer>
        </>
    );
}
