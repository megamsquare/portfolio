import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import { CSSRulePlugin } from 'gsap/all';
import { GUI } from 'dat.gui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit  {
  @ViewChild('canvas')
  canvasRef!: ElementRef;

  private get canvas(): HTMLCanvasElement{
    return this.canvasRef.nativeElement;
  }

  public scene!: THREE.Scene;
  public renderer!: THREE.WebGLRenderer;
  public camera!: THREE.PerspectiveCamera;
  private orbitControl!: OrbitControls;

  // private gui = new GUI({autoPlace: true});

  // Texture Loader
  public textureLoader = new THREE.TextureLoader();

  // Geometry
  public particleGeometry = new THREE.BufferGeometry();

  //Material
  public particleMaterial = new THREE.PointsMaterial({ size: 0.005, vertexColors: true })

 // Texture Loader
  public spaceTexture = new THREE.TextureLoader();

  //Lighting
  public pointLight1 = new THREE.PointLight(0xffffff);
  public pointLight2 = new THREE.PointLight(0xff0000);

  // Mesh
  public particlesMesh: THREE.Points = new THREE.Points(this.particleGeometry, this.particleMaterial);

  // Clock
  public clock = new THREE.Clock();

  // initial mouse angle
  public mouseX = 0;
  public mouseY = 0;

  // Target angle
  public targetX = 0;
  public targetY = 0;

  // Fog value
  public fogHex = 0x000000;
  public fogDensity = 0.0007;

  // Number of particles
  public particleCount = 50000;

  // Particles positioning
  public particlePosition = new Float32Array(this.particleCount * 3);

  public colors: any[] = [];
  public color = new THREE.Color();

  public parameters = [
    [
        [1, 1, 0.5], 5
    ],
    [
        [0.95, 1, 0.5], 4
    ],
    [
        [0.90, 1, 0.5], 3
    ],
    [
        [0.85, 1, 0.5], 2
    ],
    [
        [0.80, 1, 0.5], 1
    ]
  ];
  public parameterCount = this.parameters.length;



  constructor( ) { }

  ngOnInit(): void {
  }


  initial() {

    gsap.registerPlugin(CSSRulePlugin);
    const borderline = CSSRulePlugin.getRule('.content::before');
    const h1 = document.querySelector('h1');
    const p = document.querySelector('p');



    const tl = gsap.timeline();
    console.log(borderline);

    tl.from(borderline, {cssRule: {scaleX: 0}});
    tl.to(h1, {  clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0% 100%)', y: '30px' }, "-=3");
    tl.to(p, { duration: 2, clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0% 100%)', y: '30px' }, "-=2");
    // console.log(tl);

    // tl.from(borderline, {delay: .5, duration: 4, });
    // this.gui.domElement.id = 'gui';
    // this.gui.domElement.style.position = 'absolutte';
    // this.gui.domElement.style.top = '2px';
    // this.gui.domElement.style.left ='2px';
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    // this.camera.position.setZ(30);
    this.camera.position.z = 30;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(this.fogHex, this.fogDensity)

    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true, alpha: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);

    this.createParticles();

    // this.guiControl();

    this.particlesMesh.position.z = 31.5;

    this.scene.add(this.particlesMesh)

    window.onresize = this.resetSettings;
    this.resetSettings();

    window.onmousemove = this.onMouseMoveParticles;
    this.onMouseMoveParticles(window.MouseEvent);

    window.ontouchstart = this.onTouchStartParticle;
    this.onTouchStartParticle(window.Touch);

    window.ontouchmove = this.onTouchMoveParticles;
    this.onTouchMoveParticles(window.Touch);

    this.animate();
  }

  createParticles() {
    const n = 1000, n2 = n / 2;
    const elapsedTime = this.clock.getElapsedTime();
    for (let i = 0; i < this.particleCount * 3; i++) {
      this.particlePosition[i] = (Math.random() - 0.5) * 5;
      const x = Math.random() * n - n2;
      const y = Math.random() * n - n2;
      const z = Math.random() * n - n2;
      const vx = ( x / n ) + 0.5;
      const vy = ( y / n ) + 0.5;
      const vz = ( z / n ) + 0.5;
      this.color.setRGB( vx, vy, vz );

      this.colors.push( this.color.r, this.color.g, this.color.b );
    }
    this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(this.particlePosition, 3));
    this.particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(this.colors, 3));

    for (let k = 0; k < this.scene.children.length; k++) {
      const object = this.scene.children[k];
      if ( object instanceof THREE.Points ) {
        object.rotation.y = elapsedTime * (k < 4 ? k + 1 : -(k + 1));
      }
    }
  }

  resetSettings = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth/window.innerHeight;

    this.camera.updateProjectionMatrix();
  }

  onMouseMoveParticles = (e: any) => {
    const elapsedTime = this.clock.getElapsedTime();
    if (e.clientX != undefined) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      this.particlesMesh.rotation.y = -this.mouseX * (elapsedTime * 0.00008)
      this.particlesMesh.rotation.x = -this.mouseY * (elapsedTime * 0.00008)
      // this.moveCamera();
    }
  }

  // guiControl() {
  //   const particlesMesh = this.gui.addFolder('Particles Control');

  //   particlesMesh.add(this.particlesMesh.position, 'z').min(1).max(100).step(0.1);
  // }


  onTouchStartParticle = (e: any) => {
    if (e !== undefined) {
      if (e.isTrusted) {
        if (e.touches.length === 1) {
          e.preventDefault();
          this.mouseX = e.touches[0].pageX - (window.innerWidth/2);
          this.mouseY = e.touches[0].pageY - (window.innerHeight/2);
          // e.defaultPrevented
        }

      }
    }
  }

  onTouchMoveParticles = (e: any) => {
    if (e !== undefined) {
      if (e.isTrusted) {
        if (e.touches.length === 1) {
          e.preventDefault();
          this.mouseX = e.touches[0].pageX - (window.innerWidth/2);
          this.mouseY = e.touches[0].pageY - (window.innerHeight/2);
          // e.defaultPrevented
        }

      }
    }
  }



  animate() {
    const elapsedTime = this.clock.getElapsedTime();
    let component: HomeComponent = this;
    (function render() {
      requestAnimationFrame(render);

      component.particlesMesh.rotation.x += -.01 * elapsedTime;
      component.particlesMesh.rotation.y += -.0005 * elapsedTime;
      component.particlesMesh.rotation.z += -.01 * elapsedTime;

      component.renderer.render(component.scene, component.camera);
    } ())
  }

  ngAfterViewInit() {
    this.initial();
  }

}
