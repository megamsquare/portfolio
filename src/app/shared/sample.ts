
// export class HomeComponent implements OnInit, AfterViewInit  {
//   @ViewChild('canvas')
//   canvasRef!: ElementRef;

//   // private get canvas(): HTMLCanvasElement{
//   //   return
//   //   // return this.canvasRef.nativeElement;
//   // }

//   public scene!: THREE.Scene;
//   public renderer!: THREE.WebGLRenderer;
//   public camera!: THREE.PerspectiveCamera;
//   public torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
//   public torusMaterial = new THREE.MeshStandardMaterial({ color: 0x6347FF});

//   public starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
//   public starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff});

//   @Input() public texture: string = "/assets/imag/space.png";

//   public spaceTexture = new THREE.TextureLoader();

//   public torus: THREE.Mesh = new THREE.Mesh(this.torusGeometry, this.torusMaterial);
//   public controls!: OrbitControls;

//   // public scene = new THREE.Scene();

//   // public camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);

//   // public renderer = new THREE.WebGLRenderer({
//   //   canvas:  this.canvasRef.nativeElement,//this.canvas,
//   //   alpha: true,
//   //   antialias: true
//   // });

//   constructor() { }

//   ngOnInit(): void {
//   }

//   private get canvas(): HTMLCanvasElement{
//     return this.canvasRef.nativeElement;
//   }


//   init() {
//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera(
//       75,
//       this.canvas.clientWidth/this.canvas.clientHeight,
//       0.1,
//       1000
//       );
//     this.renderer = new THREE.WebGLRenderer({
//       canvas:  this.canvas,
//       alpha: true,
//       antialias: true
//     })
//     this.renderer.setPixelRatio(window.devicePixelRatio);
//     this.renderer.setSize(window.innerWidth, window.innerHeight);
//     this.camera.position.setZ(30);
//     this.renderer.render(this.scene, this.camera);
//     this.controls  = new OrbitControls(this.camera, this.renderer.domElement);

//     this.scene.add(this.torus);

//     const pointLight = new THREE.PointLight(0xffffff);
//     pointLight.position.set(5,5,5);

//     const ambientLight = new THREE.AmbientLight(0xffffff);

//     this.scene.add(pointLight, ambientLight);

//     const lightHelper = new THREE.PointLightHelper(pointLight);
//     const gridHelper = new THREE.GridHelper(200,50);
//     this.scene.add(lightHelper, gridHelper);
//     // console.log(this.star);
//     Array(200).fill(0).forEach(this.addStar);

//     this.scene.background = this.spaceTexture.load(this.texture);
//     this.animate();
//   }

//   addStar = () => {
//     const star = new THREE.Mesh(this.starGeometry, this.starMaterial);
//     const [x,y,z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));
//     star.position.set(x,y,z);
//     this.scene.add(star);
//   }

//   animate() {
//     let component: HomeComponent = this;
//     (function render() {
//       requestAnimationFrame(render);

//       component.torus.rotation.x += 0.01;
//       component.torus.rotation.y += 0.005;
//       component.torus.rotation.z += 0.01;

//       component.controls.update();

//       component.renderer.render(component.scene, component.camera);
//     } ())
//   }

//   ngAfterViewInit() {
//     this.init();
//     console.log();

//     // this.animate();
//   }

// }
