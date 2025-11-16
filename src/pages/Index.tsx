import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  date: string;
}

const portfolioImages = [
  {
    id: 1,
    url: "https://cdn.poehali.dev/projects/c6c5896e-339e-4548-8b73-3bbbe71e74a1/files/a64de739-cba6-4f06-a2b5-5957be78e214.jpg",
    title: "Портрет",
    category: "Портретная фотография"
  },
  {
    id: 2,
    url: "https://cdn.poehali.dev/projects/c6c5896e-339e-4548-8b73-3bbbe71e74a1/files/a0434e8e-6ec3-4b0f-a171-960ca53788c6.jpg",
    title: "Свадьба",
    category: "Свадебная съёмка"
  },
  {
    id: 3,
    url: "https://cdn.poehali.dev/projects/c6c5896e-339e-4548-8b73-3bbbe71e74a1/files/a44d423f-7f1f-40da-9974-0273918e7320.jpg",
    title: "Студия",
    category: "Студийная съёмка"
  }
];

const pricingPlans = [
  {
    title: "Базовый",
    price: "15 000 ₽",
    duration: "1 час",
    features: ["До 20 обработанных фото", "1 локация", "Онлайн-галерея", "Базовая ретушь"]
  },
  {
    title: "Стандарт",
    price: "25 000 ₽",
    duration: "2 часа",
    features: ["До 50 обработанных фото", "2 локации", "Онлайн-галерея", "Профессиональная ретушь", "Помощь со стилем"]
  },
  {
    title: "Премиум",
    price: "45 000 ₽",
    duration: "4 часа",
    features: ["До 100 обработанных фото", "Неограниченно локаций", "Онлайн-галерея", "Премиум ретушь", "Стилист в подарок", "Печать фотокниги"]
  }
];

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<typeof portfolioImages[0] | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Анна Петрова",
      text: "Потрясающий фотограф! Фотографии получились волшебными, именно такими, как я мечтала.",
      rating: 5,
      date: "15.11.2024"
    },
    {
      id: 2,
      name: "Михаил Иванов",
      text: "Профессионал своего дела. Свадебная фотосессия прошла на высшем уровне!",
      rating: 5,
      date: "10.11.2024"
    }
  ]);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 5 });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleAddReview = () => {
    if (!newReview.name || !newReview.text) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }

    const review: Review = {
      id: Date.now(),
      name: newReview.name,
      text: newReview.text,
      rating: newReview.rating,
      date: new Date().toLocaleDateString("ru-RU")
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: "", text: "", rating: 5 });
    toast.success("Спасибо за ваш отзыв!");
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Фотограф</h1>
            
            <div className="hidden md:flex gap-8">
              <button onClick={() => scrollToSection("about")} className="text-sm hover:text-primary transition-colors">
                Обо мне
              </button>
              <button onClick={() => scrollToSection("portfolio")} className="text-sm hover:text-primary transition-colors">
                Портфолио
              </button>
              <button onClick={() => scrollToSection("pricing")} className="text-sm hover:text-primary transition-colors">
                Цены
              </button>
              <button onClick={() => scrollToSection("reviews")} className="text-sm hover:text-primary transition-colors">
                Отзывы
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-sm hover:text-primary transition-colors">
                Контакты
              </button>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col gap-6 mt-8">
                  <button 
                    onClick={() => scrollToSection("about")} 
                    className="text-lg hover:text-primary transition-colors text-left"
                  >
                    Обо мне
                  </button>
                  <button 
                    onClick={() => scrollToSection("portfolio")} 
                    className="text-lg hover:text-primary transition-colors text-left"
                  >
                    Портфолио
                  </button>
                  <button 
                    onClick={() => scrollToSection("pricing")} 
                    className="text-lg hover:text-primary transition-colors text-left"
                  >
                    Цены
                  </button>
                  <button 
                    onClick={() => scrollToSection("reviews")} 
                    className="text-lg hover:text-primary transition-colors text-left"
                  >
                    Отзывы
                  </button>
                  <button 
                    onClick={() => scrollToSection("contact")} 
                    className="text-lg hover:text-primary transition-colors text-left"
                  >
                    Контакты
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Создаю истории<br />через объектив
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Профессиональная фотосъёмка портретов, свадеб и событий. 
                Каждый кадр — это эмоция, застывшая во времени.
              </p>
              <Button onClick={() => scrollToSection("contact")} size="lg" className="hover-scale">
                Связаться со мной
              </Button>
            </div>
            <div className="fade-in">
              <img 
                src="https://cdn.poehali.dev/projects/c6c5896e-339e-4548-8b73-3bbbe71e74a1/files/a44d423f-7f1f-40da-9974-0273918e7320.jpg"
                alt="Hero"
                className="rounded-lg shadow-2xl w-full h-[500px] object-cover hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Обо мне</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Более 10 лет я занимаюсь профессиональной фотографией. Моя специализация — 
            портреты, свадьбы и event-съёмка. Я верю, что каждое мгновение уникально, 
            и моя задача — сохранить его красоту для вас. Работаю с профессиональным 
            оборудованием и индивидуальным подходом к каждому клиенту.
          </p>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Портфолио</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolioImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group cursor-pointer overflow-hidden rounded-lg aspect-[3/4] relative"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    <p className="text-sm">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Цены</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`hover-scale ${index === 1 ? 'border-primary border-2' : ''}`}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <div className="text-3xl font-bold text-primary mb-1">{plan.price}</div>
                  <p className="text-muted-foreground mb-6">{plan.duration}</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={index === 1 ? "default" : "outline"}>
                    Выбрать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Отзывы клиентов</h2>
          
          <div className="mb-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Оставить отзыв</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Ваше имя"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  />
                  <Textarea
                    placeholder="Ваш отзыв"
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    rows={4}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Оценка:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                        >
                          <Icon
                            name={star <= newReview.rating ? "Star" : "Star"}
                            size={20}
                            className={star <= newReview.rating ? "fill-primary text-primary" : "text-gray-300"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleAddReview}>Отправить отзыв</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="fade-in">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold">{review.name}</h4>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < review.rating ? "fill-primary text-primary" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Контакты</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Готовы запечатлеть ваши важные моменты? Свяжитесь со мной!
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Icon name="Mail" size={20} className="text-primary" />
              <a href="mailto:photo@example.com" className="hover:text-primary transition-colors">
                photo@example.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Icon name="Phone" size={20} className="text-primary" />
              <a href="tel:+79001234567" className="hover:text-primary transition-colors">
                +7 (900) 123-45-67
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Icon name="Instagram" size={20} className="text-primary" />
              <a href="#" className="hover:text-primary transition-colors">
                @photographer
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2024 Фотограф. Все права защищены.
        </div>
      </footer>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          {selectedImage && (
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;