import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, Variants } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { contactLinks } from '@/data/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const Contact = () => {
  const { t } = useTranslation();
  const { reducedMotionEnabled } = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Create schema with translations
  const contactSchema = z.object({
    name: z.string()
      .trim()
      .min(1, t('contact.validation.nameRequired'))
      .max(100, t('contact.validation.nameMax')),
    email: z.string()
      .trim()
      .min(1, t('contact.validation.emailRequired'))
      .email(t('contact.validation.emailInvalid'))
      .max(255, t('contact.validation.emailMax')),
    message: z.string()
      .trim()
      .min(1, t('contact.validation.messageRequired'))
      .max(1000, t('contact.validation.messageMax')),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you'd send the data to your backend here
    console.log('Form submitted:', data);
    
    setSubmitStatus('success');
    reset();
    
    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotionEnabled ? 0 : 0.1,
      }
    }
  };

  const itemVariants: Variants = reducedMotionEnabled
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(ellipse at center, hsl(190 90% 50% / 0.08), transparent 60%)' }}
      />

      <div className="container-wide relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-headline mb-3">
              <span className="text-gradient font-extrabold">{t('contact.title')}</span>
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.name')}
                  </label>
                  <Input
                    id="name"
                    {...register('name')}
                    className={`bg-muted/30 border-border/50 focus:border-primary ${errors.name ? 'border-destructive' : ''}`}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`bg-muted/30 border-border/50 focus:border-primary ${errors.email ? 'border-destructive' : ''}`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.message')}
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    className={`bg-muted/30 border-border/50 focus:border-primary resize-none ${errors.message ? 'border-destructive' : ''}`}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full glow-sm"
                  disabled={submitStatus === 'loading'}
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      {t('contact.form.sending')}
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {t('contact.form.success')}
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {t('contact.form.error')}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t('contact.form.submit')}
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Links */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                {t('contact.orConnect')}
              </h3>
              
              <div className="space-y-4 flex-1">
                {contactLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                      rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-card transition-all focus-ring group"
                      whileHover={reducedMotionEnabled ? {} : { x: 8 }}
                    >
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {t(`contact.links.${link.labelKey}`)}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
